json.array!(@books) do |book|
  json.extract! book, :id, :name, :active, :completed, :read_pages, :total_pages, :groups
end