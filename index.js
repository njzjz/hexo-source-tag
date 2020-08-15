hexo.extend.injector.register('head_end', () => {
	const css = hexo.extend.helper.get('css').bind(hexo);
	const { name, version } = require('./package.json');
	return css(`https://cdn.jsdelivr.net/npm/${name}@${version}/css/source.css`);
});

function datestr(y, m, d){
	datesting = "";
	if (y){
		datesting += "于"+ y.toString() + "年";
		if (m){
			datesting += m.toString() +"月";
			if (d){
				datesting += d.toString() +"日";
			}
		}
	}
	return datesting;
}


hexo.extend.tag.register('source', function(args){
	var source = args[0];
	var id = args[1];
	var cls, platform, link;
	datestring = datestr(args[2], args[3], args[4]);
	if (source == "zhihu"){
		cls = "info zhihu"; 
		platform = "知乎专栏";
		link = "https://zhuanlan.zhihu.com/p/" + id;
	}else if( source == "wechat"){
		cls = "success wechat"; 
		platform = "微信公众号";
		link = "https://mp.weixin.qq.com/s/" + id;
	}else if ( source == "zhihu_answer"){
		cls = "info zhihu";
		platform = "知乎";
		link = "https://www.zhihu.com/answer/" + id;
	}
	return `<div class="note sourcenote ${cls}">本文${datestring}发表于${platform}，<a href="${link}">查看原文</a></div>`;
});
