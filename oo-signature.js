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