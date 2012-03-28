class ReportsController < ApplicationController

  def index
    respond_to do |format|
      format.html do
        @account_id = session[:account_id]
      end
      format.json do
        account_id = session[:account_id]
        @reports = Account.find(account_id).reports
        render json: {success: true, results: @reports}
      end
    end
  end

  def speed
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM speed_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

  def events

  end

  def distance
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM distance_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

  def alerts
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM alert_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

  def stops
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM stop_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

end
