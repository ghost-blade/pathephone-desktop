import { app, Tray, Menu } from 'electron'

import { RESOURCES_PATH } from '#config'

export default (mainWindow) => {
  const tray = new Tray(`${RESOURCES_PATH}/indicator-icon.png`)

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show',
      click: () => {
        mainWindow.show()
      }},
    { label: 'Quit',
      click: () => {
        app.quit()
      }}
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Pathephone')
}