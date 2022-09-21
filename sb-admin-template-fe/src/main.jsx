import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import BookList from './pages/Books/BookList'
import BookForm from './pages/Books/BookForm'
import CategoryList from './pages/Categories/CategoryList'
import CategoryForm from './pages/Categories/CategoryForm'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="books" element={<BookList />} />
          <Route path="books/form" element={<BookForm />} />
          <Route path="books/form/:bookId" element={<BookForm />} />

          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/form" element={<CategoryForm />} />
          <Route path="categories/form/:categoryId" element={<CategoryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
