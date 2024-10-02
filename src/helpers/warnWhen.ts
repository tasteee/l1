const WARN_STYLE_0 = `
  background-color: #fff3cd;
  color: #856404;
  padding: 10px 15px;
  border: 2px dashed orange;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`

const ERROR_STYLE_0 = `
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px 15px;
  border: 2px dashed red;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`

export class hmu extends console {
  warn(...args: any[]) {
    console.warn(...args, WARN_STYLE_0)
  }

  warnWhen(condition: any, message: string, data?: any) {
    !!condition && console.warn(`%c${message}`, WARN_STYLE_0)
  }
}

export function warnWhen(condition: any, message: string, data?: any) {
  if (!!condition) {
    console.warn(`%c${message}`, styles)

    if (data !== undefined) {
      console.warn('Additional data:', data)
    }
  }
}

const gradient0 = `linear-gradient(45deg, hsla(201, 100%, 81%, 1) 0%, hsla(316, 100%, 93%, 1) 43%, hsla(318, 100%, 91%, 1) 60%, hsla(316, 100%, 93%, 1) 75%, hsla(314, 100%, 96%, 1) 100%)`
const gradient1 = `linear-gradient(138deg, hsla(201, 100%, 81%, 1) 0%, hsla(316, 100%, 93%, 1) 55%, hsla(318, 100%, 91%, 1) 72%, hsla(316, 100%, 93%, 1) 86%, hsla(314, 100%, 96%, 1) 98%, hsla(0, 0%, 100%, 1) 100%, hsla(0, 0%, 100%, 1) 100%, hsla(0, 0%, 100%, 1) 100%)`

const styleA = `
  background-image: ${gradient0};
  border: 6px solid azure;
  color: black;
  padding: 12px;
  border-radius: 4px;
`

const styleB = `
  background: ${gradient0};
  -webkit-background-clip: text;
  color: transparent;
  font-size: 20px;
  font-weight: 900;
`

const creteSpaces = (count: number) => ' '.repeat(count)

console.log('%c meowww mwroww meow meow meoowww meow' + space.repeat(5), styleA)

console.log('%c meow meow', styleB)
