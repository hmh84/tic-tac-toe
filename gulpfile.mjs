import gulp from 'gulp';
import { deleteAsync } from 'del';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import htmlmin from 'gulp-htmlmin';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

// -----------------------------
// Clean dist folder
// -----------------------------
export function clean() {
    return deleteAsync(['dist/**', '!dist']);
}

// -----------------------------
// CSS: minify
// -----------------------------
export function styles() {
    return gulp.src(['**/css/**/*.css', '!**/node_modules/**'], { base: 'src' })
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
}

// -----------------------------
// JS: minify
// -----------------------------
export function scripts() {
    return gulp.src(['**/scripts/**/*.js', '!**/node_modules/**'], { base: 'src' })
        .pipe(terser())
        .pipe(gulp.dest('dist'));
}

// -----------------------------
// HTML: minify
// -----------------------------
export function html() {
    return gulp.src(['**/*.html', '!**/node_modules/**'], { base: 'src' })
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
}

// -----------------------------
// Images: optimize
// -----------------------------
export function images() {
    return gulp.src(['**/graphics/**/*.{png,jpg,jpeg,gif,svg,webp}', '!**/node_modules/**'], { base: 'src' })
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
            svgo()
        ]))
        .pipe(gulp.dest('dist'));
}

// -----------------------------
// Copy other static assets
// -----------------------------
export function copyStatic() {
    return gulp.src([
        '**/sounds/**/*',
        '!**/sounds/**/*.{png,jpg,jpeg,gif,svg,webp}',
        '!**/node_modules/**'
    ], { base: 'src' })
        .pipe(gulp.dest('dist'));
}

// -----------------------------
// Build task (runs once)
// -----------------------------
export const build = gulp.series(
    clean,
    gulp.parallel(
        styles,
        scripts,
        html,
        images,
        copyStatic
    )
);

// -----------------------------
// Watch task
// -----------------------------
export function watch() {
    gulp.watch(['**/styles/**/*.css', '!**/node_modules/**'], styles);
    gulp.watch(['**/scripts/**/*.js', '!**/node_modules/**'], scripts);
    gulp.watch(['**/*.html', '!**/node_modules/**'], html);
    gulp.watch(['**/assets/**/*.{png,jpg,jpeg,gif,svg,webp}', '!**/node_modules/**'], images);
    gulp.watch([
        '**/assets/**/*',
        '!**/assets/**/*.{png,jpg,jpeg,gif,svg,webp}',
        '!**/node_modules/**'
    ], copyStatic);
}

// -----------------------------
// Dev task: build once, then watch
// -----------------------------
export const dev = gulp.series(build, watch);

// -----------------------------
// Default: just build
// -----------------------------
export default build;
