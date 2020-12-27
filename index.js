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

function datestr(t, y, m, d){
	if (y&&m&&d) return format(t['dateymd'], y, m, d);
	else if (y&&m) return format(t['dateym'], y, m);
	else if (y) return format(t['datey'], y);
	else return '';
}

platform_info = require('./platform.json');
hexo.extend.tag.register('source', function(args){
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
	return `<sourcetag><div class="note sourcenote ${cls}">${published_str}<a href="${link}">${raw_str}</a></div></sourcetag>`;
}, {async: true});

hexo.extend.filter.register('after_render:html', function(str, data){
  var re = /<sourcetag>(([\s\S])*?)<\/sourcetag>/g;
  if(data.page.__index){
    // remove source tag in index
    str = str.replace(re, "");
  } else {
    if(str.match(re)){
      // only add scripts for pages that have the tag
      str = str.replace(re, "$1");
      str = str.replace('</head>', css(cdn_url('css/source.css')) + '</head>');
    }
  }
  return str;
});
