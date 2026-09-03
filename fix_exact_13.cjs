const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

html = html.replace('<span id="header-places-count">Осталось: <strong class="text-emerald-300 font-bold">3</strong> из 6 мест</span>', '<span id="header-places-count" data-i18n-html="header.placesCount">Remaining: <strong class="text-emerald-300 font-bold">3</strong> of 6 spots</span>');
html = html.replace(`            <h2 class="font-display text-lg sm:text-xl lg:text-2xl font-black text-white uppercase tracking-tight" data-i18n="rooms.title">
              Номера и Цены
            </h2>`, `            <h2 class="font-display text-lg sm:text-xl lg:text-2xl font-black text-white uppercase tracking-tight" data-i18n="rooms.title">
              Rooms & Pricing
            </h2>`);
html = html.replace(`            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl" data-i18n="rooms.sub">
              Всего 6 номеров. На данный момент свободно только 3 места.
            </p>`, `            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl" data-i18n="rooms.sub">
              Only 6 rooms in total. Currently just 3 spots are available.
            </p>`);

html = html.replace(`              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r1Size">
                32 м²
              </div>`, `              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r1Size">
                32 m²
              </div>`);

html = html.replace(`              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r2Size">
                45 м²
              </div>`, `              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r2Size">
                45 m²
              </div>`);

html = html.replace(`                <a href="https://t.me/samal_it_bunker" target="_blank" class="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase" data-i18n="rooms.r2Btn">
                  Занять
                </a>`, `                <a href="https://t.me/samal_it_bunker" target="_blank" class="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase" data-i18n="rooms.r2Btn">
                  Reserve
                </a>`);

html = html.replace(`              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r3Size">
                55 м²
              </div>`, `              <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/90 text-white font-mono text-xs font-bold" data-i18n="rooms.r3Size">
                55 m²
              </div>`);

html = html.replace(`                <a href="https://t.me/samal_it_bunker" target="_blank" class="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase" data-i18n="rooms.r3Btn">
                  Занять
                </a>`, `                <a href="https://t.me/samal_it_bunker" target="_blank" class="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase" data-i18n="rooms.r3Btn">
                  Reserve
                </a>`);

html = html.replace(`          <h2 class="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3" data-i18n="tariffs.title">
            Сравнение Вариантов Проживания
          </h2>`, `          <h2 class="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3" data-i18n="tariffs.title">
            Living Options Comparison
          </h2>`);

html = html.replace(`          <p class="text-xs sm:text-sm text-slate-300" data-i18n="tariffs.sub">
            Сравните реальные расходы: самостоятельная организация быта против пакетного проживания без забот.
          </p>`, `          <p class="text-xs sm:text-sm text-slate-300" data-i18n="tariffs.sub">
            Compare real expenses: managing daily hassles yourself vs. all-inclusive worry-free living.
          </p>`);

html = html.replace('АК', 'AK');
html = html.replace('ДМ', 'DM');
html = html.replace('ИВ', 'IV');

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Fixed exact 13 lines');
