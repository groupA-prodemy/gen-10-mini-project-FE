import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import ArticleForm from './pages/Article/ArticleForm'
import ArticleList from './pages/Article/ArticleList'
import AuthorForm from './pages/Author/AuthorForm'
import AuthorList from './pages/Author/AuthorList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/form" element={<ArticleForm />} />
          <Route path="articles/form/:id" element={<ArticleForm />} />

          <Route path="authors" element={<AuthorList />} />
          <Route path="authors/form" element={<AuthorForm />} />
          <Route path="authors/form/:id" element={<AuthorForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
