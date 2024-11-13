import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'

const app = new Hono()
// our database
const todos = [
  {
    id: 1,
    description: "turn in HW",
    isComplete: false
  },
  {
  id: 2,
  description: "study for test",
  isComplete: false
  },
  ]


app.use("/*", serveStatic({    //this is breaking the site i dont get the auto fill for the right one
  root: "./static",
}))


app.get('/api/todos/', (c) => {
  // data base call to fetch todos
  console.log("fetching and returning todos")
  return c.json(todos)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
