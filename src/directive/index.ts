// vite 批量导入

const directives:Record<string, any> = import.meta.glob('./**/*.ts', { eager: true });

export default directives;