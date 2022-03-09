package static

import (
	"embed"
)

//go:embed files/index.html files/assets/*.js files/assets/*.css
var FS embed.FS
