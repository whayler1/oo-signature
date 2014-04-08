/**
 * This module returns the signature that is required for an Ooyala API request.
 *
 * @param {String} apiKey The api key from your backlot account.
 * @param {String} secretKey The secret key from your backlot account.
 * @param {String|Integer} The expires arg for your api request. You can generate
 * 	one easily with this equation: Math.round(new Date().getTime() / 1000) + 120
 * @param {path} path The api request path, sans any query string.
 * @param {String|undefined} method The request method. Defaults to 'GET' if undefined.
 *
 * @return {String} signatureStr The signature.
 *
 * @author Justin Worsdale
 */

var crypto = require('crypto');

module.exports = function(apiKey, secretKey, expires, path, method) {
	
	var method = method || 'GET',
		
		shaInput = secretKey +
			method +
			path +
			'api_key=' + apiKey +
			'expires=' + expires,
		
		shaDigest = crypto.createHash('sha256').update(shaInput).digest('base64'),
	
		signatureStr = encodeURIComponent(shaDigest.substr(0,43).replace(/=*$/, '') );
	
	return signatureStr;
}