#require "java"
#require "flying_saucer"
#include ExcelHelper

class DevicesController < ApplicationController

  def index
    @devices = Device.all
    respond_to do |format|
      format.json {render json: {success: true, results: @devices}}
    end
  end

  def poll
    device = Device.find_by_imei_number(params[:imei])
    render :json => device.events.last
  end

  #
  #def xls
  #  @devices = Device.all
  #  filename = params[:controller] + ".xls"
  #  send_data toXls(@devices), :filename => filename,:type => "application/vnd.ms-" + "excel"
  #end
  #
  #def pdf
  #  @devices = Device.all
  #  @filename = params[:controller] + ".pdf"
  #  render_pdf(@filename)
  #end
  #
  #private
  #
  #def render_pdf(filename)
  #  @html = render_to_string
  #
  #  html_file = java.io.File.createTempFile(params[:action], ".html")
  #  html_file.delete_on_exit
  #
  #  pdf_file = java.io.File.createTempFile(params[:action], ".pdf")
  #  pdf_file.delete_on_exit
  #
  #  file_output_stream = java.io.FileOutputStream.new(html_file)
  #  file_output_stream.write(java.lang.String.new(@html).get_bytes("UTF-8"))
  #  file_output_stream.close
  #
  #  renderer = org.xhtmlrenderer.pdf.ITextRenderer.new
  #
  #  fonts_path = File.dirname(__FILE__) + '/../lib/fonts/*.ttf'
  #
  #  if File.exist?(fonts_path)
  #    font_resolver = renderer.getFontResolver()
  #
  #    Dir[fonts_path].each do |file|
  #      font_resolver.add_font(file, true)
  #    end
  #  end
  #
  #  renderer.set_document(html_file)
  #  renderer.layout
  #  renderer.createPDF(java.io.FileOutputStream.new(pdf_file), true)
  #
  #  send_file pdf_file.path, :type => "application/pdf", :filename => filename, :disposition => "attachment", :layout => "pdf"
  #end

end
