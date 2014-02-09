# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
    plugins:
        moment:
            formats: [
                {raw: 'date', format: 'MMMM Do YYYY', formatted: 'humanDate'}
                {raw: 'date', format: 'YYYY-MM-DD', formatted: 'computerDate'}
            ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
