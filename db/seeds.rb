a = Admin.new(email: 'test@gmail.com', picture_url: 'https://randomuser.me/api/portraits/men/6.jpg')
a.password = '123'
a.save

a.post.create!(title: 'Rails will thrive!', tags: ['backend', 'rails'])