module ExcelHelper
#  require 'java'
#  require 'poi-3.7-20101029.jar'
#  include_class 'org.apache.poi.poifs.filesystem.POIFSFileSystem'
#  include_class 'org.apache.poi.hssf.usermodel.HSSFCell'
#  include_class 'org.apache.poi.hssf.usermodel.HSSFWorkbook'
#  include_class 'org.apache.poi.hssf.usermodel.HSSFCellStyle'
#  include_class 'org.apache.poi.hssf.usermodel.HSSFDataFormat'
#  include_class 'java.io.ByteArrayOutputStream'
#  include_class 'java.util.Date'
#
#  def toXls(items=[])
#    book = HSSFWorkbook.new()
#    sheet = book.createSheet("values");
#    dateStyle = book.createCellStyle();
#    dateStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm"))
#
#    # header row
#    if !items.empty?
#      row = sheet.createRow(0);
#      cell_index = 0
#      items[0].class.columns.each do |column|
#        row.createCell(cell_index).setCellValue(column.name);
#        cell_index += 1
#      end
#    end
#
#    # value rows
#    row_index = 1
#    items.each do |item|
#      row = sheet.createRow(row_index);
#
#      cell_index = 0
#      item.class.columns.each do |column|
#        cell = row.createCell(cell_index)
#        if column.sql_type =~ /date/ then
#          millis = item.send(column.name).to_f * 1000
#          cell.setCellValue(Date.new(millis))
#          cell.setCellStyle(dateStyle);
#        elsif column.sql_type =~ /int/ then
#          cell.setCellValue(item.send(column.name).to_i)
#        else
#          cell.setCellValue(item.send(column.name))
#        end
#        cell_index += 1
#      end
#      row_index += 1
#    end
#
#    outs = ByteArrayOutputStream.new
#    book.write(outs);
#    outs.close();
#    String.from_java_bytes(outs.toByteArray)
#  end
end
