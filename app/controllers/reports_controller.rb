class ReportsController < ApplicationController

  def index
    respond_to do |format|
      format.html
      format.json do
        @reports = current_account.reports
        render json: @reports
      end
    end
  end

  def speed
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    type = get_type(period)
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM #{type}_speed_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

  def get_type(period)
    case period
      when 'MONTH' then 'monthly'
      when 'DAY' then 'daily'
      when 'WEEK' then 'weekly'
    end
  end

  def create
    parameters = params[:parameters]
    name = params[:name]
    devices = params[:devices].join(",")
    report = Report.new(name: name, category: parameters[:type], date: parameters[:date],
                        period: parameters[:period], devices: devices, account_id: session[:account_id])
    if report.save
      render :json => report
    else
      render :json => report.errors
    end
  end

  def distance
    date = params[:parameters][:date]
    period = params[:parameters][:period]
    type = get_type(period)
    devices = params[:vehicles]
    sql = %{
      SELECT * FROM #{type}_distance_events
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
      SELECT device_name, period, data_point FROM alert_events
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
      SELECT device_name, period, data_point FROM stop_events
      WHERE period BETWEEN '#{date}'::date - INTERVAL '1 #{period}' AND '#{date}' AND device_id IN (#{devices.join(",")})
      ORDER BY period, device_id
    }
    results = ActiveRecord::Base.connection.execute(sql)
    render :json => results
  end

end
