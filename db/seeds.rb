Dir[Rails.root.join('db/seeds/*')].each do |f|
  load f
end
