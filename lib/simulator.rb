class Simulator

  def start(filename, host, port)
    raise "The file '#{filename}' could not be found." unless File.exists? filename
    event_data = File.readlines(filename)
    Logger.info("Starting the simulator with event data taken from '#{filename}'")
    event_data.each do |request|
      data = parse(request)
      begin
        socket = TCPSocket.open(host, port)
        Logger.info("Sending #{data}.")
        socket.print data
        socket.close
      rescue
        Logger.info("Unable to connect to #{host} on port #{port}. Will try again later.")
      end
      sleep(rand(5))
    end
  end

  def insert(filename)
    raise "The file '#{filename}' could not be found." unless File.exists? filename
    event_data = File.readlines(filename)
    Logger.info("Starting the simulator with event data taken from '#{filename}'")
    event_data.each do |request|
      data = parse(request)
      event = Parser.new.read(data)
      event = Inspector.new.analyze(event)
      event.save!
    end
  end

  def parse(request)
    /\$POS.+/.match(request)[0]
  end

end