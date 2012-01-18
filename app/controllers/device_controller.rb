require "java"
require "flying_saucer"
include ExcelHelper

class DeviceController < ApplicationController
	 
	  def index
	    @devices = Device.find :all
	  end
	  
	  layout "pdf"
	  
	  def pdf
	    @devices = Device.find :all
	    render_pdf("device.pdf")
	  end
	 
	  private
	 
	  def render_pdf(filename)
	    @html = render_to_string
	 
	    html_file = java.io.File.createTempFile(params[:action], ".html")
	    html_file.delete_on_exit
	 
	    pdf_file = java.io.File.createTempFile(params[:action], ".pdf")
	    pdf_file.delete_on_exit
	 
	    file_output_stream = java.io.FileOutputStream.new(html_file)
	    file_output_stream.write(java.lang.String.new(@html).get_bytes("UTF-8"))
	    file_output_stream.close
	 
	    renderer = org.xhtmlrenderer.pdf.ITextRenderer.new
	 
	    # if you put custom fonts in the lib/fonts folder under your Rails project, they will be available to your PDF document
	    # Just specify  the correct font-family via CSS and Flying Saucer will use the correct font.
#	    fonts_path = RAILS_ROOT + "/lib/fonts/*.ttf"

       fonts_path = File.dirname(__FILE__) + '/../lib/fonts/*.ttf'
	 
	    if File.exist?(fonts_path)
       font_resolver = renderer.getFontResolver()
	 
	      Dir[fonts_path].each do |file|
	        font_resolver.add_font(file, true)
	      end
	    end
	 
	    renderer.set_document(html_file)
	    renderer.layout
       renderer.createPDF(java.io.FileOutputStream.new(pdf_file), true)
	 
	    send_file pdf_file.path, :type => "application/pdf", :filename => filename, :disposition => "attachment"
	  end

end
