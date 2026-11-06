window.__ModuleLoader__.load({
	id: "dsh-frosted-glass",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

		/**
		 * Native macOS vibrancy pass-through for the Desktop window.
		 *
		 * The Electron shell already creates the window with `vibrancy: "sidebar"`
		 * and a transparent background, and the Web client already keeps the
		 * window frame and the sidebar translucent over it. Every remaining pane
		 * (conversation, right bar, bottom row) paints `--dsw-alias-bg-base`
		 * opaque, which hides the material.
		 *
		 * Re-tinting that one token with an alpha color makes the whole window
		 * glass in one place, and the blur stays macOS' own (crisp, cheap, and
		 * not re-blurred per frame by CSS).
		 *
		 * Selectors are `html[data-platform="darwin"] body…` because the theme
		 * also sets the token on `body` (and on `body[data-ds-dark-theme]`), so
		 * the override needs both matching specificity and a later position.
		 *
		 * These sheets are injected when the module materializes: the module
		 * system runs factory side effects at that point, which is also when a
		 * style sheet must be present. Disabling the plugin removes this entry
		 * from the module graph, and the page drops the sheet with the module.
		 */
		const CSS = `
/* dsh-frosted-glass — let the native macOS material show through the panes. */
html[data-platform="darwin"] body {
	--dsh-frosted-glass-pane: color-mix(in srgb, #fdfdff 56%, transparent);
}

html[data-platform="darwin"] body[data-ds-dark-theme] {
	--dsh-frosted-glass-pane: color-mix(in srgb, #151517 44%, transparent);
}

html[data-platform="darwin"] body {
	--dsw-alias-bg-base: var(--dsh-frosted-glass-pane) !important;
}

/* Page-style surfaces (插件, 自动化任务 …) scroll inside pageBody, and their
   pageBar sticks with a painted strip that masks what scrolls under it. Once the
   tint is translucent that extra strip is one layer darker than the body — the
   band this plugin had to remove. The pages the product already ships without a
   sticky bar (自动化任务) read as one colour, so match them: let the header
   scroll with the content and drop the strip. */
html[data-platform="darwin"] [class*="pageBar"] {
	position: static !important;
	backdrop-filter: none !important;
}

html[data-platform="darwin"] [class*="pageBar"]:before {
	background: transparent !important;
}

/* Each surface that paints --dsw-alias-bg-base stacks one more tint layer, so the
   conversation, the schedule page and the plugin page ended up at different
   depths. Drop the pane-level layers (the conversation root carries the column
   width custom property; page roots carry a page-ish class) and let the layout's
   single tint show through, so every main surface reads the same. */
html[data-platform="darwin"] body [style*="--dsh-conversation-column-width"],
html[data-platform="darwin"] body [class*="page"],
html[data-platform="darwin"] body [class*="TabHost"] {
	background: transparent !important;
}

/* The macOS sidebar rule already mixes the sidebar fill at 50% with
   transparency; halving the fill's own alpha lands around 25%, so the native
   material does most of the work there too. */
html[data-platform="darwin"] body {
	--dsw-specific-sidebar-fill: color-mix(in srgb, #f9fafb 50%, transparent);
}

html[data-platform="darwin"] body[data-ds-dark-theme] {
	--dsw-specific-sidebar-fill: color-mix(in srgb, #1b1b1c 50%, transparent);
}

/* Full-screen windows have no desktop behind them, so transparency would
   composite against black; native apps fall back to solid there too. */
html[data-platform="darwin"][data-fullscreen] body {
	--dsw-alias-bg-base: var(--dsw-static-neutral-bluish-00) !important;
}

html[data-platform="darwin"][data-fullscreen] body[data-ds-dark-theme] {
	--dsw-alias-bg-base: var(--dsw-static-neutral-bluish-950) !important;
}

@media (prefers-reduced-transparency: reduce) {
	html[data-platform="darwin"] body {
		--dsw-alias-bg-base: var(--dsw-static-neutral-bluish-00) !important;
	}

	html[data-platform="darwin"] body[data-ds-dark-theme] {
		--dsw-alias-bg-base: var(--dsw-static-neutral-bluish-950) !important;
	}
}
`;

		(() => {
			const existing = document.querySelector('style[data-plugin="dsh-frosted-glass"]');
			if (existing) existing.remove();
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-frosted-glass";
			tag.dataset.pluginCss = "dsh-frosted-glass/frosted-glass.css";
			tag.textContent = CSS;
			(document.head ?? document.documentElement).appendChild(tag);
		})();

		/** The pane sheet has no separate lifecycle; the module system owns it. */
		function apply(ctx) {}

		exports.apply = apply;
		return module.exports;
	}
});
