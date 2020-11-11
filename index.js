const css = hexo.extend.helper.get('css').bind(hexo);
const { name, version } = require('./package.json');
const { format } = require('util');

const i18n = new require('hexo-i18n')({
    languages: ['en', 'zh-CN']
});

i18n.set('en', require('./locales/en.json'));
i18n.set('zh-CN', require('./locales/zh-CN.json'));

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

function datestr(__, y, m, d){
	if (y&&m&&d) return __('dateymd', y, m, d);
	else if (y&&m) return __('dateym', y, m);
	else if (y) return __('datey', y);
	else return '';
}

platform_info = require('./platform.json');
hexo.extend.tag.register('source', function(args){
	const lang = this.page.lang;
	var __ = i18n.__(lang);
	var source = args[0];
	var id = args[1];
	var cls, platform, link;
	datestring = datestr(__, args[2], args[3], args[4]);
	cls = platform_info[source].cls;
	link = platform_info[source].link;
	platform = __('platform.'+source);
	published_str = __('publish', datestring, platform);
	raw_str = __('raw');
	return `<div class="note sourcenote ${cls}">${published_str}<a href="${link}">${raw_str}</a></div>`;
}, {async: true});

