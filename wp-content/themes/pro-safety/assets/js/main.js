(() => {
	const header = document.querySelector('[data-header]');
	const toggle = document.querySelector('[data-menu-toggle]');

	// Header bekommt beim Scrollen einen Hintergrund
	const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	// Mobiles Menü
	if (toggle) {
		const setOpen = (open) => {
			header.classList.toggle('is-open', open);
			toggle.setAttribute('aria-expanded', String(open));
		};
		toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
		document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
		window.matchMedia('(min-width: 961px)').addEventListener('change', () => setOpen(false));
	}

	// FAQ-Themen
	const tabs = document.querySelectorAll('.faq__tab');
	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			tabs.forEach((t) => {
				const active = t === tab;
				t.setAttribute('aria-selected', String(active));
				document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
			});
		});
	});

	// Elemente beim Scrollen einblenden
	const items = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-in');
					io.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px' });
		items.forEach((el) => io.observe(el));
	} else {
		items.forEach((el) => el.classList.add('is-in'));
	}
})();
