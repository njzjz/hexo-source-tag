const css = hexo.extend.helper.get('css').bind(hexo);
const { name, version } = require('./package.json');
const format = require('string-format');

const i18n = {
    'en': require('./locales/en.json'),
    'zh-CN': require('./locales/zh-CN.json')
}

function cdn_url(path){
	return `https://cdn.jsdelivr.net/npm/${name}@${version}/${path}`;
}

hexo.extend.injector.register('head_end', () => {
	return css(cdn_url('css/source_index.css'));
}, 'home');

hexo.extend.injector.register('head_end', () => {
	return css(cdn_url('css/source.css'));
}, 'post');

hexo.extend.injector.register('head_end', () => {
	return css(cdn_url('css/source.css'));
}, 'page');

function datestr(t, y, m, d){
	if (y&&m&&d) return format(t['dateymd'], y, m, d);
	else if (y&&m) return format(t['dateym'], y, m);
	else if (y) return format(t['datey'], y);
	else return '';
}

platform_info = require('./platform.json');
hexo.extend.tag.register('source', function(args){
	const lang = args[5] || 'zh-CN';
	var t = i18n[lang];
	var source = args[0];
	var id = args[1];
	var cls, platform, link;
	datestring = datestr(t, args[2], args[3], args[4]);
	cls = platform_info[source].cls;
	link = format(platform_info[source].link, id);
	platform = t['platform'][source];
	published_str = format(t['publish'], datestring, platform);
	raw_str = t['raw'];
	return `<div class="note sourcenote ${cls}">${published_str}<a href="${link}">${raw_str}</a></div>`;
}, {async: true});

