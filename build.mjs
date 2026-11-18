/**
 * Builds the Flame Friend website (privacy policy + support) into plain HTML files.
 *
 * Run:  node build.mjs
 *
 * All the words live in this file, one block per language (English, French, Spanish).
 * The pages have no JavaScript, no cookies, no trackers and no outside fonts or scripts.
 *
 * Made by Little Ladybug Labs (D39). After changing anything here: `node build.mjs`, commit, push.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// ---- Studio and contact (D39) ----
const STUDIO = 'Little Ladybug Labs'; // always in English, in every language
const CONTACT_EMAIL = 'littleladybuglabs@gmail.com';
/** "Made by …" in each language; the studio name stays in English (marked lang="en" for screen readers). */
const MADE_BY = {
  en: `Made by ${STUDIO}`,
  fr: `Créé par <span lang="en">${STUDIO}</span>`,
  es: `Creado por <span lang="en">${STUDIO}</span>`,
};
const UPDATED = { en: 'November 18, 2026', fr: '18 novembre 2026', es: '18 de noviembre de 2026' };

const LANGS = ['en', 'fr', 'es'];
const LANG_NAMES = { en: 'English', fr: 'Français', es: 'Español' };
/** Folder for each language: English at the top level, the others under /fr/ and /es/. */
const dir = (lang) => (lang === 'en' ? '' : `${lang}/`);

const mail = () =>
  CONTACT_EMAIL.includes('@') ? `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>` : `<span class="placeholder">${CONTACT_EMAIL}</span>`;

const GITHUB_PRIVACY = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';
const APPLE_REFUNDS = 'https://reportaproblem.apple.com';

// ---------------------------------------------------------------------------------------------
const T = {
  en: {
    siteTitle: 'Flame Friend',
    tagline: 'A calm candle for little ones to blow out.',
    nav: { home: 'Home', privacy: 'Privacy policy', support: 'Support' },
    updated: (d) => `Last updated: ${d}`,
    home: {
      intro:
        'Flame Friend is a calm iPhone app for toddlers (about 1½ to 4 years) and their grown-ups. Your child blows at the phone to put out a friendly cartoon candle, gets a gentle reward, and the flame lights again. Families use it for potty time, shots, the dentist, bedtime and birthdays.',
      noData: 'No accounts, no ads, no tracking. Nothing about your child leaves your phone.',
    },
    privacy: {
      title: 'Privacy policy',
      summary: 'Flame Friend collects no data. Nothing about you or your child leaves your phone.',
      sections: [
        [
          'The microphone',
          `<p>Flame Friend uses the microphone only while the candle is on screen, to measure <strong>how loud</strong> a blow is: a single number, many times a second.</p>
<ul>
<li>Sound is <strong>never recorded, saved or sent</strong> anywhere.</li>
<li>To measure loudness, the iPhone's audio recorder writes a short temporary file as a side effect. The app deletes it right away and never reads or keeps it.</li>
<li>You can switch to "Taps only" in the app's parent area, or turn the microphone off in iPhone Settings → Flame Friend.</li>
</ul>`,
        ],
        [
          'What stays on your phone',
          `<p>The app keeps a few things on your phone so it remembers them next time:</p>
<ul>
<li>your settings (mode, sensitivity, theme, language and so on);</li>
<li>the results of "Teach Puff your blow": loudness levels and blow lengths (numbers, not sound);</li>
<li>a simple history: the date and time of each session, the mode, and how many times the flame went out. It's kept for up to one year;</li>
<li>whether Premium was bought.</li>
</ul>
<p>All of this stays on your phone and is deleted when you delete the app. We don't receive any of it. (If you back up your iPhone to iCloud or a computer, iOS may include it in <em>your own</em> backup, as it does for any app.)</p>`,
        ],
        [
          'What leaves the phone, only when you choose',
          `<ul>
<li><strong>History export:</strong> you can export the history as a spreadsheet file (CSV) with the iPhone share sheet. You choose where it goes.</li>
<li><strong>Links:</strong> this website opens in your browser when you tap a link in the app.</li>
</ul>
<p>Both are behind a simple grown-up question, as are the iPhone Settings link and purchases.</p>`,
        ],
        [
          'Purchases',
          `<p>The one-time Premium purchase is handled entirely by <strong>Apple</strong>. We never see your name, your Apple Account or your payment details. The app only asks Apple whether Premium was bought on this Apple Account, so it can unlock the themes.</p>`,
        ],
        [
          'No accounts, ads, analytics or tracking',
          `<p>There's no sign-in, no advertising, no analytics, no crash reporting and no tracking of any kind, and no third-party code that collects data. The app doesn't connect to any server of ours (we don't have one). Its only internet connection is to Apple, for purchases.</p>`,
        ],
        [
          'Children',
          `<p>Flame Friend is made for children 5 and under, used with a grown-up. It doesn't collect personal information from children, or from anyone else.</p>`,
        ],
        [
          'This website',
          `<p>These pages use no cookies, trackers, analytics, or outside fonts or scripts. They're hosted on GitHub Pages; like any web host, GitHub may keep standard server logs (such as IP addresses) for security. See <a href="${GITHUB_PRIVACY}">GitHub's privacy statement</a>.</p>`,
        ],
        ['Changes', `<p>If this policy changes, this page and the date at the top will be updated.</p>`],
        ['Contact', () => `<p>Questions about privacy: ${mail()}</p>`],
      ],
    },
    support: {
      title: 'Support',
      sections: [
        [
          'What is Flame Friend?',
          `<p>A calm app for toddlers: your child blows at the phone to put out Puff the candle's flame, gets a gentle reward, and the flame lights again. There's also a guided Calm Breathing mode and a Birthday cake with 1 to 10 candles.</p>`,
        ],
        [
          'Getting started',
          `<ul>
<li>Hold the phone upright, with its <strong>bottom edge</strong> toward your child's mouth: that's where the microphone is.</li>
<li>The <strong>parent area</strong> opens when you press and hold the grown-up icon (top right) for 2 seconds.</li>
<li>Tapping the flame puts it out too, for children who can't blow yet.</li>
</ul>`,
        ],
        [
          'Puff doesn’t react when my child blows',
          `<ul>
<li>Check that the microphone is allowed: iPhone <strong>Settings → Flame Friend → Microphone</strong>.</li>
<li>In the parent area, choose <strong>Sensitivity → Extra easy</strong>, or use <strong>"Teach Puff your blow"</strong> so Puff learns your child's blow.</li>
<li>Aim at the bottom edge of the phone.</li>
</ul>`,
        ],
        [
          'Puff goes out when we talk',
          `<p>In the parent area, choose <strong>Sensitivity → Normal</strong> or <strong>Noisy room</strong>. Loud talking right next to the phone can still count sometimes: Flame Friend prefers catching a soft blow over ignoring it.</p>`,
        ],
        [
          'Premium',
          `<p>Classic Puff and every mode are free. Premium is a <strong>one-time purchase</strong> that unlocks all the themes, and every theme added later, at no extra cost. No subscription. It's shared with your family through Family Sharing.</p>`,
        ],
        [
          'How to restore a purchase',
          `<ol>
<li>Make sure the iPhone is signed in to the <strong>same Apple Account</strong> that bought Premium.</li>
<li>Open the parent area (hold the grown-up icon for 2 seconds) → <strong>Themes</strong> → <strong>Restore purchases</strong>.</li>
<li>Answer the grown-up question. You'll see "Your purchase is restored."</li>
</ol>
<p>After reinstalling the app, Premium usually comes back by itself the first time the app is opened with an internet connection.</p>`,
        ],
        [
          'Refunds',
          `<p>Purchases are handled by Apple, so refunds are too: <a href="${APPLE_REFUNDS}">reportaproblem.apple.com</a>.</p>`,
        ],
        ['Contact', () => `<p>Something not working, or an idea? Write to ${mail()}. Please include your iPhone model and iOS version.</p>`],
      ],
    },
  },

  fr: {
    siteTitle: 'Flame Friend',
    tagline: 'Une bougie toute calme que les petits peuvent souffler.',
    nav: { home: 'Accueil', privacy: 'Politique de confidentialité', support: 'Assistance' },
    updated: (d) => `Dernière mise à jour : ${d}`,
    home: {
      intro:
        'Flame Friend est une application iPhone toute calme pour les tout-petits (de 1 an et demi à 4 ans environ) et leurs adultes. Votre enfant souffle sur le téléphone pour éteindre une gentille bougie de dessin animé, reçoit une douce récompense, puis la flamme se rallume. Les familles s’en servent pour le petit pot, les vaccins, le dentiste, le coucher et les anniversaires.',
      noData: 'Aucun compte, aucune publicité, aucun suivi. Rien sur votre enfant ne quitte votre téléphone.',
    },
    privacy: {
      title: 'Politique de confidentialité',
      summary: 'Flame Friend ne collecte aucune donnée. Rien sur vous ou votre enfant ne quitte votre téléphone.',
      sections: [
        [
          'Le micro',
          `<p>Flame Friend utilise le micro seulement quand la bougie est à l’écran, pour mesurer <strong>la force</strong> d’un souffle : un seul nombre, plusieurs fois par seconde.</p>
<ul>
<li>Le son n’est <strong>jamais enregistré, conservé ni envoyé</strong> nulle part.</li>
<li>Pour mesurer la force du son, l’enregistreur audio de l’iPhone crée au passage un court fichier temporaire. L’application le supprime aussitôt, sans jamais le lire ni le garder.</li>
<li>Vous pouvez choisir « Toucher seulement » dans l’espace adultes, ou couper le micro dans Réglages de l’iPhone → Flame Friend.</li>
</ul>`,
        ],
        [
          'Ce qui reste sur votre téléphone',
          `<p>L’application garde quelques informations sur votre téléphone pour s’en souvenir la prochaine fois :</p>
<ul>
<li>vos réglages (mode, sensibilité, thème, langue, etc.);</li>
<li>les résultats de « Apprendre son souffle à Puff » : des niveaux sonores et des durées de souffle (des nombres, pas du son);</li>
<li>un historique simple : la date et l’heure de chaque séance, le mode, et le nombre de fois où la flamme s’est éteinte. Il est gardé jusqu’à un an;</li>
<li>si Premium a été acheté.</li>
</ul>
<p>Tout cela reste sur votre téléphone et est effacé quand vous supprimez l’application. Nous n’en recevons rien. (Si vous sauvegardez votre iPhone dans iCloud ou sur un ordinateur, iOS peut l’inclure dans <em>votre propre</em> sauvegarde, comme pour toute application.)</p>`,
        ],
        [
          'Ce qui quitte le téléphone, seulement si vous le choisissez',
          `<ul>
<li><strong>Exportation de l’historique :</strong> vous pouvez exporter l’historique dans un fichier tableur (CSV) avec la feuille de partage de l’iPhone. C’est vous qui choisissez où il va.</li>
<li><strong>Liens :</strong> ce site s’ouvre dans votre navigateur quand vous touchez un lien dans l’application.</li>
</ul>
<p>Les deux sont protégés par une petite question pour les adultes, tout comme le lien vers les Réglages et les achats.</p>`,
        ],
        [
          'Achats',
          `<p>L’achat unique de Premium est entièrement géré par <strong>Apple</strong>. Nous ne voyons jamais votre nom, votre compte Apple ni vos informations de paiement. L’application demande seulement à Apple si Premium a été acheté avec ce compte Apple, pour débloquer les thèmes.</p>`,
        ],
        [
          'Aucun compte, publicité, analyse ni suivi',
          `<p>Pas de connexion à un compte, pas de publicité, pas d’analyse, pas de rapports de plantage, aucun suivi d’aucune sorte, et aucun code de tiers qui collecte des données. L’application ne se connecte à aucun serveur à nous (nous n’en avons pas). Sa seule connexion Internet est vers Apple, pour les achats.</p>`,
        ],
        [
          'Les enfants',
          `<p>Flame Friend est conçu pour les enfants de 5 ans et moins, avec un adulte. L’application ne collecte aucun renseignement personnel sur les enfants, ni sur qui que ce soit.</p>`,
        ],
        [
          'Ce site Web',
          `<p>Ces pages n’utilisent ni témoins (cookies), ni traceurs, ni outils d’analyse, ni polices ou scripts externes. Elles sont hébergées par GitHub Pages; comme tout hébergeur, GitHub peut conserver des journaux de serveur habituels (comme les adresses IP) pour des raisons de sécurité. Voir la <a href="${GITHUB_PRIVACY}">déclaration de confidentialité de GitHub</a> (en anglais).</p>`,
        ],
        ['Changements', `<p>Si cette politique change, cette page et la date en haut seront mises à jour.</p>`],
        ['Nous joindre', () => `<p>Questions sur la confidentialité : ${mail()}</p>`],
      ],
    },
    support: {
      title: 'Assistance',
      sections: [
        [
          'Qu’est-ce que Flame Friend?',
          `<p>Une application toute calme pour les tout-petits : votre enfant souffle sur le téléphone pour éteindre la flamme de Puff la bougie, reçoit une douce récompense, puis la flamme se rallume. Il y a aussi un mode Respiration calme guidé et un gâteau d’anniversaire avec 1 à 10 bougies.</p>`,
        ],
        [
          'Pour commencer',
          `<ul>
<li>Tenez le téléphone debout, le <strong>bas</strong> tourné vers la bouche de votre enfant : c’est là que se trouve le micro.</li>
<li>L’<strong>espace adultes</strong> s’ouvre en gardant le doigt sur l’icône des adultes (en haut à droite) pendant 2 secondes.</li>
<li>Toucher la flamme l’éteint aussi, pour les enfants qui ne savent pas encore souffler.</li>
</ul>`,
        ],
        [
          'Puff ne réagit pas quand mon enfant souffle',
          `<ul>
<li>Vérifiez que le micro est autorisé : <strong>Réglages → Flame Friend → Micro</strong> sur l’iPhone.</li>
<li>Dans l’espace adultes, choisissez <strong>Sensibilité → Très facile</strong>, ou utilisez <strong>« Apprendre son souffle à Puff »</strong> pour que Puff apprenne le souffle de votre enfant.</li>
<li>Visez le bas du téléphone.</li>
</ul>`,
        ],
        [
          'Puff s’éteint quand on parle',
          `<p>Dans l’espace adultes, choisissez <strong>Sensibilité → Normal</strong> ou <strong>Pièce bruyante</strong>. Parler fort tout près du téléphone peut encore compter parfois : Flame Friend préfère attraper un petit souffle plutôt que de l’ignorer.</p>`,
        ],
        [
          'Premium',
          `<p>Puff classique et tous les modes sont gratuits. Premium est un <strong>achat unique</strong> qui débloque tous les thèmes, et chaque thème ajouté plus tard, sans frais de plus. Pas d’abonnement. Il est partagé avec votre famille grâce au Partage familial.</p>`,
        ],
        [
          'Restaurer un achat',
          `<ol>
<li>Assurez-vous que l’iPhone est connecté au <strong>même compte Apple</strong> que celui qui a acheté Premium.</li>
<li>Ouvrez l’espace adultes (gardez le doigt 2 secondes sur l’icône des adultes) → <strong>Thèmes</strong> → <strong>Restaurer les achats</strong>.</li>
<li>Répondez à la question pour les adultes. Le message « Votre achat est restauré. » s’affiche.</li>
</ol>
<p>Après une réinstallation, Premium revient habituellement tout seul la première fois que l’application est ouverte avec une connexion Internet.</p>`,
        ],
        [
          'Remboursements',
          `<p>Les achats sont gérés par Apple, les remboursements aussi : <a href="${APPLE_REFUNDS}">reportaproblem.apple.com</a>.</p>`,
        ],
        ['Nous joindre', () => `<p>Un problème ou une idée? Écrivez à ${mail()}. Indiquez si possible votre modèle d’iPhone et votre version d’iOS.</p>`],
      ],
    },
  },

  es: {
    siteTitle: 'Flame Friend',
    tagline: 'Una vela tranquila para que los peques la soplen.',
    nav: { home: 'Inicio', privacy: 'Política de privacidad', support: 'Ayuda' },
    updated: (d) => `Última actualización: ${d}`,
    home: {
      intro:
        'Flame Friend es una app tranquila para iPhone para niños pequeños (de 1 año y medio a 4 años, más o menos) y sus adultos. Tu hijo o hija sopla al teléfono para apagar una simpática vela de dibujos animados, recibe una suave recompensa y la llama se vuelve a encender. Las familias la usan para ir al baño, las vacunas, el dentista, la hora de dormir y los cumpleaños.',
      noData: 'Sin cuentas, sin anuncios, sin rastreo. Nada sobre tu hijo o hija sale de tu teléfono.',
    },
    privacy: {
      title: 'Política de privacidad',
      summary: 'Flame Friend no recopila ningún dato. Nada sobre ti o tu hijo o hija sale de tu teléfono.',
      sections: [
        [
          'El micrófono',
          `<p>Flame Friend usa el micrófono solo mientras la vela está en pantalla, para medir <strong>qué tan fuerte</strong> es un soplido: un solo número, varias veces por segundo.</p>
<ul>
<li>El sonido <strong>nunca se graba, se guarda ni se envía</strong> a ninguna parte.</li>
<li>Para medir el volumen, la grabadora de audio del iPhone crea de paso un breve archivo temporal. La app lo borra enseguida y nunca lo lee ni lo guarda.</li>
<li>Puedes elegir «Solo toques» en el área para adultos, o apagar el micrófono en Configuración del iPhone → Flame Friend.</li>
</ul>`,
        ],
        [
          'Lo que se queda en tu teléfono',
          `<p>La app guarda algunas cosas en tu teléfono para recordarlas la próxima vez:</p>
<ul>
<li>tus ajustes (modo, sensibilidad, tema, idioma, etc.);</li>
<li>los resultados de «Enséñale tu soplido a Puff»: niveles de volumen y duración de los soplidos (números, no sonido);</li>
<li>un historial sencillo: la fecha y la hora de cada sesión, el modo y cuántas veces se apagó la llama. Se guarda hasta un año;</li>
<li>si se compró Premium.</li>
</ul>
<p>Todo esto se queda en tu teléfono y se borra cuando eliminas la app. Nosotros no recibimos nada. (Si haces una copia de seguridad del iPhone en iCloud o en una computadora, iOS puede incluirlo en <em>tu propia</em> copia, como con cualquier app.)</p>`,
        ],
        [
          'Lo que sale del teléfono, solo si tú lo decides',
          `<ul>
<li><strong>Exportar el historial:</strong> puedes exportar el historial como archivo de hoja de cálculo (CSV) con el menú de compartir del iPhone. Tú eliges a dónde va.</li>
<li><strong>Enlaces:</strong> este sitio se abre en tu navegador cuando tocas un enlace en la app.</li>
</ul>
<p>Ambos están protegidos con una sencilla pregunta para adultos, igual que el enlace a Configuración y las compras.</p>`,
        ],
        [
          'Compras',
          `<p>La compra única de Premium la gestiona por completo <strong>Apple</strong>. Nunca vemos tu nombre, tu cuenta de Apple ni tus datos de pago. La app solo le pregunta a Apple si se compró Premium con esta cuenta de Apple, para desbloquear los temas.</p>`,
        ],
        [
          'Sin cuentas, anuncios, análisis ni rastreo',
          `<p>No hay inicio de sesión, ni publicidad, ni análisis, ni informes de errores, ni rastreo de ningún tipo, ni código de terceros que recopile datos. La app no se conecta a ningún servidor nuestro (no tenemos ninguno). Su única conexión a Internet es con Apple, para las compras.</p>`,
        ],
        [
          'Niños',
          `<p>Flame Friend está hecha para niños de 5 años o menos, junto con un adulto. No recopila información personal de los niños ni de nadie.</p>`,
        ],
        [
          'Este sitio web',
          `<p>Estas páginas no usan cookies, rastreadores, análisis, ni fuentes o scripts externos. Están alojadas en GitHub Pages; como cualquier servicio de alojamiento, GitHub puede guardar registros normales del servidor (como direcciones IP) por seguridad. Consulta la <a href="${GITHUB_PRIVACY}">declaración de privacidad de GitHub</a> (en inglés).</p>`,
        ],
        ['Cambios', `<p>Si esta política cambia, se actualizarán esta página y la fecha de arriba.</p>`],
        ['Contacto', () => `<p>Preguntas sobre privacidad: ${mail()}</p>`],
      ],
    },
    support: {
      title: 'Ayuda',
      sections: [
        [
          '¿Qué es Flame Friend?',
          `<p>Una app tranquila para niños pequeños: tu hijo o hija sopla al teléfono para apagar la llama de Puff, la vela, recibe una suave recompensa y la llama se vuelve a encender. También hay un modo guiado de Respiración tranquila y un pastel de cumpleaños con 1 a 10 velas.</p>`,
        ],
        [
          'Para empezar',
          `<ul>
<li>Sostén el teléfono en vertical, con la <strong>parte de abajo</strong> hacia la boca de tu hijo o hija: ahí está el micrófono.</li>
<li>El <strong>área para adultos</strong> se abre manteniendo presionado el ícono de adultos (arriba a la derecha) durante 2 segundos.</li>
<li>Tocar la llama también la apaga, para los niños que todavía no saben soplar.</li>
</ul>`,
        ],
        [
          'Puff no reacciona cuando mi hijo o hija sopla',
          `<ul>
<li>Revisa que el micrófono esté permitido: <strong>Configuración → Flame Friend → Micrófono</strong> en el iPhone.</li>
<li>En el área para adultos, elige <strong>Sensibilidad → Muy fácil</strong>, o usa <strong>«Enséñale tu soplido a Puff»</strong> para que Puff aprenda el soplido de tu hijo o hija.</li>
<li>Apunta a la parte de abajo del teléfono.</li>
</ul>`,
        ],
        [
          'Puff se apaga cuando hablamos',
          `<p>En el área para adultos, elige <strong>Sensibilidad → Normal</strong> o <strong>Lugar ruidoso</strong>. Hablar fuerte muy cerca del teléfono todavía puede contar a veces: Flame Friend prefiere atrapar un soplido suave antes que ignorarlo.</p>`,
        ],
        [
          'Premium',
          `<p>Puff clásico y todos los modos son gratis. Premium es una <strong>compra única</strong> que desbloquea todos los temas, y cada tema que se agregue después, sin costo extra. Sin suscripción. Se comparte con tu familia mediante En familia.</p>`,
        ],
        [
          'Cómo restaurar una compra',
          `<ol>
<li>Asegúrate de que el iPhone tenga abierta la <strong>misma cuenta de Apple</strong> con la que se compró Premium.</li>
<li>Abre el área para adultos (mantén presionado el ícono de adultos 2 segundos) → <strong>Temas</strong> → <strong>Restaurar compras</strong>.</li>
<li>Responde la pregunta para adultos. Verás «Tu compra se restauró.»</li>
</ol>
<p>Después de reinstalar la app, Premium suele volver solo la primera vez que se abre la app con conexión a Internet.</p>`,
        ],
        [
          'Reembolsos',
          `<p>Las compras las gestiona Apple, y los reembolsos también: <a href="${APPLE_REFUNDS}">reportaproblem.apple.com</a>.</p>`,
        ],
        ['Contacto', () => `<p>¿Algo no funciona, o tienes una idea? Escribe a ${mail()}. Si puedes, indica tu modelo de iPhone y tu versión de iOS.</p>`],
      ],
    },
  },
};

// ---------------------------------------------------------------------------------------------
/** Relative link from a page at `depth` folders deep to a site path like "privacy/". */
const link = (depth, to) => '../'.repeat(depth) + to;

function page({ lang, kind, depth }) {
  const t = T[lang];
  const title = kind === 'home' ? t.siteTitle : `${t[kind].title} · ${t.siteTitle}`;
  const here = (l) => `${dir(l)}${kind === 'home' ? '' : `${kind}/`}`;
  const langLinks = LANGS.map((l) =>
    l === lang
      ? `<span aria-current="page">${LANG_NAMES[l]}</span>`
      : `<a href="${link(depth, here(l))}" hreflang="${l}" lang="${l}">${LANG_NAMES[l]}</a>`,
  ).join(' · ');
  const nav = ['home', 'privacy', 'support']
    .map((k) => {
      const href = link(depth, `${dir(lang)}${k === 'home' ? '' : `${k}/`}`);
      return k === kind ? `<span aria-current="page">${t.nav[k]}</span>` : `<a href="${href}">${t.nav[k]}</a>`;
    })
    .join('');

  let body;
  if (kind === 'home') {
    body = `<p class="lead">${t.home.intro}</p>
<p class="summary">${t.home.noData}</p>
<p class="buttons"><a class="button" href="${link(depth, `${dir(lang)}privacy/`)}">${t.nav.privacy}</a> <a class="button" href="${link(depth, `${dir(lang)}support/`)}">${t.nav.support}</a></p>`;
  } else {
    const p = t[kind];
    const sections = p.sections
      .map(([h, html]) => `<section>\n<h2>${h}</h2>\n${typeof html === 'function' ? html() : html}\n</section>`)
      .join('\n');
    body = `<h1>${p.title}</h1>
${kind === 'privacy' ? `<p class="updated">${t.updated(UPDATED[lang])}</p>\n<p class="summary">${p.summary}</p>` : ''}
${sections}`;
  }

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta name="robots" content="index, follow">
<title>${title}</title>
<link rel="icon" href="${link(depth, 'icon.png')}">
<link rel="stylesheet" href="${link(depth, 'style.css')}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${link(depth, here(l))}">`).join('\n')}
</head>
<body>
<header>
<a class="brand" href="${link(depth, dir(lang))}"><img src="${link(depth, 'icon.png')}" alt="" width="56" height="56"><span><strong>${t.siteTitle}</strong><small>${t.tagline}</small></span></a>
<nav aria-label="Languages" class="langs">${langLinks}</nav>
</header>
<nav class="tabs">${nav}</nav>
<main>
${body}
</main>
<footer><p>Flame Friend · ${MADE_BY[lang]} · ${mail()}</p></footer>
</body>
</html>
`;
}

for (const lang of LANGS) {
  for (const kind of ['home', 'privacy', 'support']) {
    const folder = `${dir(lang)}${kind === 'home' ? '' : `${kind}/`}`;
    const depth = folder.split('/').filter(Boolean).length;
    const out = path.join(folder, 'index.html');
    mkdirSync(path.dirname(out) || '.', { recursive: true });
    writeFileSync(out, page({ lang, kind, depth }));
    console.log('wrote', out);
  }
}
