class HelpController < ApplicationController

  def index
    Rails.logger.info(params[:section])
    render params[:section]
  end

end