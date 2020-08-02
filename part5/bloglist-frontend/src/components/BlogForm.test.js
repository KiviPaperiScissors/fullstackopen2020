import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> functionality tests', () => {
  const mockAdd = jest.fn()
  const user = {
    username: 'Tester'
  }

  const component = render(
    <BlogForm createBlog={mockAdd} user={user}/>
  )

  component.debug()

  let title = component.container.querySelector('#title')
  let author = component.container.querySelector('#author')
  let url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'The test title' }
  })
  fireEvent.change(author, {
    target: { value: 'The test author' }
  })
  fireEvent.change(url, {
    target: { value: 'The test url' }
  })

  component.debug()
  fireEvent.submit(form)
  console.log(mockAdd.mock.calls)

  expect(mockAdd.mock.calls).toHaveLength(1)
  expect(mockAdd.mock.calls[0][0].title).toBe('The test title')
  expect(mockAdd.mock.calls[0][0].author).toBe('The test author')
  expect(mockAdd.mock.calls[0][0].url).toBe('The test url')

})
