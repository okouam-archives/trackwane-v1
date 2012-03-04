class Parser

  def read(data)
    fields = data.split(",")
    event = Event.new({
      :longitude => coordinates(fields[6], fields[7]),
      :latitude => coordinates(fields[4], fields[5]),
      :heading => fields[9].to_f,
      :speed => fields[8].to_f,
      :date => merge_timestamp(date(fields[10]),time(fields[2].to_f)),
      :gps_signal => gps_signal(fields[3])
    })
		{event: event, imei_number: fields[1]}
  end

  def coordinates(data, quadrant)
    len = data.length
    dd = data[0, (len - 7)]
    mm1 = data[(len - 7), (len - 5)]
    mm2 = data[(len - 4), 4]
    position = dd + "." + mm1 + mm2
    point = position.to_f
    partie_entiere = point.to_i
    mm = (point - partie_entiere) * 100
    mm /= 60
    point = partie_entiere + mm
    point *= (-1) if ((quadrant.eql? "S") || (quadrant.eql? "W") )
    point
  end

  def date(ddmmyy)
    year = (ddmmyy.to_i % 100) + 2000
    month = (ddmmyy.to_i / 100) % 100
    day = ddmmyy.to_i / 10000
    {year: year, month: month, day: day}
  end

  def merge_timestamp(day, time)
    DateTime.new(day[:year], day[:month], day[:day], time[:hour], time[:minutes], time[:seconds])
  end

  def time(hhmmss)
    hh = hhmmss / 10000
    mm = (hhmmss / 100) % 100
    ss = hhmmss % 100
    {hour: hh, minutes: mm, seconds: ss}
  end

  def gps_signal(data)
    data == "A"
  end

end