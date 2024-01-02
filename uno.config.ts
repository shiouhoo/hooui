import { defineConfig, presetAttributify, presetWind } from 'unocss';

export default defineConfig({
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    },
    theme: {
        colors: {
            primary: '#ff0000',
        },
    },
    presets: [
        presetAttributify(),
        presetWind(),
    ],
    rules: [
        [/^scrollbar-([^-]+)(-(.+))?$/, ([, d,, value], { rawSelector }) => {
            let p = '';
            if (!value) {
                p = `width: ${d}; height: ${d}`;
            }
            if (d === 'w') {
                p = `width: ${value}`;
            } else if (p === 'h') {
                p = `height: ${value}`;
            }
            return `.${rawSelector}::-webkit-scrollbar {
                ${p}
            }`;
        }],
        // 文本超出省略
        // usage: class="ellipsis ellipsis-2 ellipsis-3"
        [/^ellipsis(-(\d*))?$/, ([,, d], { rawSelector }) => {
            return `.${rawSelector} {${
                Number(d) > 1
                    ? `overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: ${d}; -webkit-box-orient: vertical;`
                    : 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
            }}`;
        }],
    ],
});
