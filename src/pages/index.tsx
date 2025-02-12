import { Outlet, useNavigate } from 'react-router'
import { useGithubUserInfoQuery } from '@/query'

import ReactLogo from '@/assets/react.svg?react'
import { useBearStore } from '@/store/bear'
import { useFishStore } from '@/store/fish'
import { Slider } from '@/components/ui/slider'

function Home() {
  const { bears, increase } = useBearStore()
  const { fish, increase: increaseFish } = useFishStore()
  const { isFetching, data } = useGithubUserInfoQuery('hello')
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4 py-6">
        <h1 className="text-xl font-bold">
          this is home
          <span className="icon-[carbon--bot] ml-3"></span>
        </h1>
        <ReactLogo className="mx-auto my-4" width={50} height={50}></ReactLogo>

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">zustand demo</h2>
          <div className="mb-4">
            <Slider></Slider>
          </div>
          <div className="mb-4">
            <button
              className="mr-3 rounded border border-black px-4 py-2"
              onClick={() => increase(1)}
            >
              click me to increase bear:
            </button>
            <span>bear: {bears}</span>
          </div>
          <div>
            <button
              className="mr-3 rounded border border-black px-4 py-2"
              onClick={() => increaseFish(1)}
            >
              click me to increase fish:
            </button>
            <span>fish: {fish}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">react-query demo</h2>
          {isFetching ? (
            <p>loading...</p>
          ) : (
            <>
              <div>{data?.login}</div>
            </>
          )}
        </div>

        <div className="space-x-4">
          <button
            className="rounded border border-black px-4 py-2"
            onClick={() => {
              navigate('child1')
            }}
          >
            go to child router 1
          </button>
          <button
            className="rounded border border-black px-4 py-2"
            onClick={() => {
              navigate('child2')
            }}
          >
            go to child router 2
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </main>
  )
}

export default Home
