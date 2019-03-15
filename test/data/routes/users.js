var express = require('express');
var router = express.Router();

/* GET users listing. */
var data = {
    "version": "0.0.45",
    "changeList": [
        {
            "version": "0.0.2",
            "files": [
                "mine/mine.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.3",
            "files": [
                "recent/chat.html",
                "contact/detail.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.4",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.5",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.6",
            "files": [
                "recent/chat.html",
                "contact/detail.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.7",
            "files": [
                "recent/chat.html",
                "contact/detail.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.8",
            "files": [
                "recent/chat.html",
                "contact/detail.html",
                "index/index.bundle.js",
                "images/traceless.png"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.9",
            "files": [
                "recent/chat.html",
                "index/dev.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.10",
            "files": [
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.11",
            "files": [
                "recent/chat.html",
                "index/index.bundle.js",
                "mine/mine.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.12",
            "files": [
                "recent/chat.html",
                "mine/mine.html",
                "index/main.html",
                "index/custom.js",
                "index/TopUtil.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.13",
            "files": [
                "recent/chat.html",
                "mine/mine.html",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.14",
            "files": [
                "mine/mine.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.15",
            "files": [
                "recent/chat.html",
                "mine/mine.html",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.16",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.17",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.18",
            "files": [
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.19",
            "files": [
                "main.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.20",
            "files": [
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.21",
            "files": [
                "main.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.22",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.23",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.24",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.26",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.27",
            "files": [
                "mine/mine.html",
                "index/index.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.28",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.29",
            "files": [
                "recent/recent.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.30",
            "files": [
                "recent/recent.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.31",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.32",
            "files": [
                "main.bundle.js",
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.33",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.34",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.35",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.36",
            "files": [
                "store/ElecSqlite.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.37",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.38",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.39",
            "files": [
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.40",
            "files": [
                "index/index.bundle.js",
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.41",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.42",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.43",
            "files": [
                "recent/chat.html"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.44",
            "files": [
                "recent/chat.html",
                "main.bundle.js",
                "index/index.bundle.js"
            ],
            "detail": [
                "test"
            ]
        },
        {
            "version": "0.0.45",
            "files": [
                "recent/recent.html",
                "contact/contact.html",
                "main.bundle.js"
            ],
            "detail": [
                "test"
            ]
        }
    ]
}
router.get('/', function(req, res, next) {
    setTimeout(() =>{
        res.send(data)
    }, 1000 * 30);
});

module.exports = router;
