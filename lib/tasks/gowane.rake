namespace :gowane do

  desc "Copies the non-fingerprinted image assets over to the public directory"
  task :assets => :environment  do
    openlayers = Dir.glob(File.join(Rails.root, "app/assets/images/OpenLayers/**"))
    icons = Dir.glob(File.join(Rails.root, "app/assets/images/icons/**"))
    FileUtils.cp_r(openlayers, File.join(Rails.root, "public/assets/OpenLayers"))
    FileUtils.cp_r(icons, File.join(Rails.root, "public/assets/icons"))
  end

end
