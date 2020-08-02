import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog /> view and functionality tests', () => {
  let component

  const mockLike = jest.fn()

  beforeEach(() => {

    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'testurl.com',
      likes: 0,
      user: {
        name: 'Tester',
        username: 'Tester'
      }
    }

    component = render(
      <Blog blog={blog} user={{ username: 'bob' }} updateBlog={mockLike}/>
    )

    component.debug()
  })

  test('Render blog title and author', () => {
    expect(
      component.container.querySelector('.blogTitle')
    ).toBeDefined()
    expect(
      component.container.querySelector('.blogAuthor')
    ).toBeDefined()
  })

  test('Do not render url, likes or user by default', () => {
    expect(
      component.container.querySelector('.blogUrl')
    ).toBe(null)
    expect(
      component.container.querySelector('.blogLikes')
    ).toBe(null)
    expect(
      component.container.querySelector('.blogUser')
    ).toBe(null)
  })

  test('Show URL and likes, when show details button is pressed', () => {

    const button = component.getByText('Show details')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.blogUrl')
    ).toBeDefined()

    expect(
      component.container.querySelector('.blogLikes')
    ).toBeDefined()

  })

  test('Pressing "like" button twice, calls handler twice', () => {
    const showButton = component.getByText('Show details')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })

})
