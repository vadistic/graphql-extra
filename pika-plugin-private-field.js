module.exports.beforeBuild = function ({ manifest }) {
  if(manifest.private === undefined) {
    console.warn('pika-plugin-private-field: package.json "private" field is missing - skipping ')
  }
}

module.exports.manifest = function (newManifest, { manifest }) {
  if ('private' in manifest) {
    newManifest.private = false
  }

  return newManifest
}
