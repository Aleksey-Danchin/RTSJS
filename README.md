# RTSJS

\- игровой 2D javascript движок для создания RTS игр.

```javascript
const game = new RTS({
	root: document.body,    // DOMElemnt display: block
	width: 900,
	height: 900
})
```

## World

\- логический и визуальный слой игрового мира, содержащий в дочерних зависимостях камеру.

```javascript
const world = new RTS.World({
    width: 900,
    height: 900
})

const world = game.world
```

## Camera

\- вспомогательный интструмент для ориентирования состояния world. Указывает просматриваемую область World. По существу не имеет смысла создавать экземпляр класса Camera так как экземпляр класса World всегда включает в себя экземпляр класса Camera.