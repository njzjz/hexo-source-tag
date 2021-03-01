const css = hexo.extend.helper.get('css').bind(hexo);
const { name, version } = require('./package.json');
const format = require('string-format');
const Injector = require("hexo-tag-injector");
const injector = new Injector(hexo, id = name);
const { npm_url } = require("jsdelivr_url");
const { htmlTag } = require("hexo-util");

const i18n = {
	'en': require('./locales/en.json'),
	'zh-CN': require('./locales/zh-CN.json')
}

function datestr(t, y, m, d) {
	if (y && m && d) return format(t['dateymd'], y, m, d);
	else if (y && m) return format(t['dateym'], y, m);
	else if (y) return format(t['datey'], y);
	else return '';
}

platform_info = require('./platform.json');
hexo.extend.tag.register('source', function (args) {
	const lang = args[5] || this.lang || 'zh-CN';
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
	return injector.mark(htmlTag(
		'div',
		{ class: `note sourcenote ${cls}` },
		`${published_str}<a href="${link}">${raw_str}</a>`,
		false,
	));
}, { async: true });

injector.register('head_end', css({
	href: npm_url(name, version, 'css/source.min.css'),
	class: 'pjax',
}), remove_from_index = true);
