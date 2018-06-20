import Timer from '../src'

describe('Test Timer', () => {
  it('should print something around 400', () => {
    let runs = 0
    let timer = new Timer(() => {
      runs++
    }, 100)
    timer.start()
    setTimeout(() => {
      timer.pause()
      setTimeout(() => {
        timer.resume()
        setTimeout(() => {
          timer.stop()
          setTimeout(() => {
            timer.start()
            setTimeout(() => {
              expect(runs).toBe(15)
            }, 1045)
          }, 5)
        }, 200)
      }, 100)
    }, 350)
  })
})
