const samplePost =  {
  id: 6,
  title: 'React學習筆記(2): Components',
  author: {
    id: 1,
    name: 'Harry Yuan',
    picture: 'https://miro.medium.com/fit/c/131/131/1*dTwJMx8S-f0UgVaqSQEHew.png',
    createdAt: 'Apr 8'
  },
  content: "<p>創建Component一般創建資料夾、Component都用大寫名稱。</p><p>When creating components, you have the choice between two different ways:</p><ol><li>Functional components (also referred to as presentational, dumb or stateless components - more about this later in the course) =&gt;const cmp = () =&gt; { return <div>some JSX</div> }(using ES6 arrow functions as shown here is recommended but optional)</li><li>class-based components (also referred to as containers, smart or stateful components) =&gt; class Cmp extends Component { render () { return <div>some JSX</div> } } We'll of course dive into the difference throughout this course, you can already note that you should use 1) as often as possible though. It's the best-practice.</li></ol><pre>\n  <code>\n\tfunction person(){\n\t\treturn (<div>\n\t\t\t\t\t\t\t\t\t\t<h1>Hi</h1>\n\t\t\t\t\t\t\t\t </div>)\n\t}\n\n\t// ES5\n\tvar person = function(){\n\t\treturn (<div>\n\t\t\t\t\t\t\t<h1>Hi</h1>\n\t\t\t </div>);\n\t}\n\t//ES6\n\t// 雖然跟function一樣，但有些好處（沒說)\n\tconst person = (props)=>{\n\t\t\treturn (<div>\n\t\t\t\t\t\t<h1>Hi</h1>\n\t\t\t\t </div>);\n\t}\n</code>\n</pre>",
  tags: [
    'frontend'
  ],
  // featuredImageUrl: 'https://i.imgur.com/b9IiFSZ.png'
  useDefaultFeaturedImage: 'react'
}

export default samplePost;