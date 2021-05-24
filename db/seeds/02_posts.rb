posts = [
  {
    title: 'Rails will thrive!',
    tags: [
      'backend',
      'rails'
    ]
  },
  {
    title: 'JSON Web Token 起手式',
    tags: [
      'backend',
      'authentication'
    ]
  },
  {
    title: 'React學習筆記(2): Components',
    tags: [
      'frontend'
    ]
  },
  {
    title: 'React學習筆記(1): 環境設置',
    tags: [
      'frontend'
    ]
  },
  {
    title: 'RxJS 非同步處理',
    tags: [
      'async_job'
    ]
  },
  {
    title: 'SEO 大補帖',
    tags: [
      'frontend',
      'seo',
    ]
  },
  {
    title: 'SCSS起手式',
    tags: [
      'frontend'
    ]
  },
  {
    title: 'Rails MVC 以外，你應該知道的各種架構',
    tags: [
      'backend'
    ]
  },
  {
    title: 'Go: Channel',
    tags: [
      'golang'
    ]
  },
  {
    title: 'Go Routine是啥？為什麼這麼強大？淺談基本運作流程跟應用',
    tags: [
      'golang',
    ]
  },
  {
    title: 'gin框架: 從開始 Listen 到使用者驗證！',
    tags: [
      'golang',
      'backend'
    ]
  },
  {
    title: 'Struct 的小技巧',
    tags: [
      'golang'
    ]
  }
]

author = Author.first
posts.each do |post|
  author.posts.find_or_create_by!(post)
end
