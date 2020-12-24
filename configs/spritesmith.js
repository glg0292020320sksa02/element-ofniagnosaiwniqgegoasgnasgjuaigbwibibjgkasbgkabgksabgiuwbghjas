import path from 'path'
import SpritesmithPlugin from 'webpack-spritesmith'

const templateFunction = function (name) {
  return function (data) {
    const shared = `.${name} {\ndisplay: inline-block;\nbackground-image: url(I);\nbackground-size: WSMpx HSMpx;\n}\n`
      .replace('I', data.sprites[0].image)
      .replace('WSM', data.spritesheet.width)
      .replace('HSM', data.spritesheet.height)
      .replace(' 0px', ' 0')
      .replace(' 0px;', ' 0;')

    const perSprite = data.sprites
      .map(sprite => {
        return '.image-N {\nwidth: Wpx;\nheight: Hpx;\nbackground-position: Xpx Ypx;\n}\n'
          .replace('N', sprite.name)
          .replace('W', sprite.width)
          .replace('H', sprite.height)
          .replace('X', sprite.offset_x)
          .replace('Y', sprite.offset_y)
          .replace(' 0px', ' 0')
          .replace(' 0px;', ' 0;')
      })
      .join('\n')

    return `${shared}\n${perSprite}`
  }
}

const spritesmith = function (name) {
  return new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, `../assets/images/${name}/`),
      glob: '**/*.png',
    },
    target: {
      image: path.resolve(__dirname, `../assets/images/${name}.png`),
      css: [
        [
          path.resolve(__dirname, `../assets/scss/${name}.scss`),
          {
            format: 'function_based_template',
          },
        ],
      ],
    },
    customTemplates: {
      function_based_template: templateFunction(name),
    },
    apiOptions: {
      cssImageRef: `'~assets/images/${name}.png'`,
    },
    spritesmithOptions: {
      padding: 10,
    },
  })
}

export { spritesmith }
export default spritesmith
