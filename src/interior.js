// Interior: master bedroom (Bedroom 2) + open walk-in closet.
// Same units/coordinates as plan.js (cm; x right, y down; z = height above floor).
//
// Bedroom 2 interior: x 343–750, y 605–897
// Walk-in (wall to the bedroom removed): x 750–963, y 710–897

import * as THREE from 'three';

// ---------------------------------------------------------------- electrical points
// t: switch | socket | light | sensor ; n: direction into the room (for wall plates)
export const ELECTRIC = [
  { id: 'К1', t: 'switch', x: 645, y: 605, h: 110, n: [0, 1], w: 8, room: 'Спалня',
    bg: 'Ключ – основна лампа, до вратата', note: 'девиатор: основната лампа се пали и от леглото' },
  { id: 'Т1', t: 'socket', x: 645, y: 605, h: 30, n: [0, 1], w: 8, room: 'Спалня',
    bg: 'Контакт – общ (прахосмукачка)' },
  { id: 'Л1', t: 'light', x: 546, y: 751, ceil: true, room: 'Спалня', bg: 'Основна лампа – таван, център' },
  { id: 'К2', t: 'switch', x: 401, y: 897, h: 85, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен ключ, ляво: нощна лампа + основна лампа' },
  { id: 'Т2', t: 'socket', x: 425, y: 897, h: 68, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт с USB, ляво нощно шкафче' },
  { id: 'Л2', t: 'light', x: 413, y: 897, h: 150, n: [0, -1], plate: false, room: 'Спалня',
    bg: 'Аплик – нощна лампа, ляво' },
  { id: 'К3', t: 'switch', x: 657, y: 897, h: 85, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен ключ, дясно: нощна лампа + основна лампа' },
  { id: 'Т3', t: 'socket', x: 633, y: 897, h: 68, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт с USB, дясно нощно шкафче' },
  { id: 'Л3', t: 'light', x: 643, y: 897, h: 150, n: [0, -1], plate: false, room: 'Спалня',
    bg: 'Аплик – нощна лампа, дясно' },
  { id: 'Т4', t: 'socket', x: 590, y: 605, h: 85, n: [0, 1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт над бюфета – настолна лампа', note: 'точно над плота, скрит зад лампата' },
  { id: 'Т5', t: 'socket', x: 343, y: 880, h: 30, n: [1, 0], w: 15, room: 'Спалня',
    bg: 'Двоен контакт до прозореца (лампион, уреди)' },
  { id: 'Д1', t: 'sensor', x: 772, y: 813, ceil: true, room: 'Дрешник',
    bg: 'Датчик за движение – пали дрешника сам' },
  { id: 'Л4', t: 'light', x: 850, y: 813, ceil: true, room: 'Дрешник', bg: 'Лампа – таван дрешник' },
  { id: 'Л5', t: 'light', x: 860, y: 768, h: 203, n: [0, 1], plate: false, room: 'Дрешник',
    bg: 'LED лента над закачалките', note: 'на същия датчик Д1' },
  { id: 'Л6', t: 'light', x: 393, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Захранване за LED огледалото на тоалетката', note: 'огледало със сензорен бутон – без отделен ключ' },
  { id: 'Т6', t: 'socket', x: 343, y: 617, h: 95, n: [1, 0], w: 8, room: 'Спалня',
    bg: 'Контакт на тоалетката (сешоар, преса)' },
  { id: 'К4', t: 'switch', x: 343, y: 637, h: 95, n: [1, 0], w: 8, room: 'Спалня',
    bg: 'Ключ – лампите от двете страни на огледалото' },
  { id: 'Л7', t: 'light', x: 352, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Лампа до огледалото, ляво', note: 'неутрална светлина 4000K, CRI 90+ – вярни цветове за грим' },
  { id: 'Л8', t: 'light', x: 436, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Лампа до огледалото, дясно', note: 'на ключ К4' },
  { id: 'К5', t: 'switch', x: 768, y: 280, h: 110, n: [0, 1], w: 8, room: 'Антре',
    bg: 'Ключ – осветление антре, до входната врата', note: 'девиатор с К6' },
  { id: 'В1', t: 'intercom', x: 768, y: 280, h: 150, n: [0, 1], w: 12, room: 'Антре',
    bg: 'Видеодомофон до входната врата' },
  { id: 'К6', t: 'switch', x: 750, y: 565, h: 110, n: [-1, 0], w: 8, room: 'Антре',
    bg: 'Ключ – осветление антре, при спалнята', note: 'светва/гаси от двата края' },
  { id: 'Л9', t: 'light', x: 708, y: 470, ceil: true, room: 'Антре', bg: 'Луни (спотове) на тавана в антрето' },
  { id: 'Л16', t: 'light', x: 715, y: 280, h: 205, n: [0, 1], plate: false, room: 'Антре',
    bg: 'Захранване за LED огледалото (подсветка отзад)', note: 'на ключ К5 или със сензорен бутон; топла светлина 2700–3000K, CRI 90+ за снимки' },
  { id: 'Д2', t: 'sensor', x: 750, y: 470, h: 30, n: [-1, 0], room: 'Антре',
    bg: 'Нощна LED светлина ниско, със сензор за движение', note: 'пътят спалня → баня нощем' },
  { id: 'Л10', t: 'light', x: 665, y: 432, h: 186, n: [1, 0], plate: false, room: 'Антре',
    bg: 'LED лента в нишата за палта' },
  { id: 'Т9', t: 'socket', x: 625, y: 555, h: 120, n: [1, 0], w: 8, room: 'Антре',
    bg: 'Контакт в шкафа – зарядна стойка за прахосмукачка' },
  { id: 'Т10', variant: 'A', t: 'socket', x: 470, y: 303, h: 3, floor: true, room: 'Дневна',
    bg: 'Подов контакт до колоната на телевизора (ток + антена + интернет)', note: 'кабелът влиза в колоната; да се заложи в замазката СЕГА' },
  { id: 'Л12', t: 'light', x: 607, y: 480, h: 126, n: [-1, 0], plate: false, room: 'Дневна',
    bg: 'LED ленти под рафта над дивана', note: 'отделно от Л11, с димер – уютна светлина вечер' },
  { id: 'Т10', variant: 'B', t: 'socket', x: 458, y: 580, h: 50, n: [0, -1], w: 22, room: 'Дневна',
    bg: 'Вариант Б: контакт + антена + интернет зад телевизора на стената', note: 'скрит зад ТВ шкафа' },
  { id: 'Т7', variant: 'B', t: 'socket', x: 610, y: 580, h: 30, n: [0, -1], w: 15, room: 'Дневна',
    bg: 'Вариант Б: двоен контакт до лежанката (лампион, зарядно)' },
  { id: 'Т7', variant: ['A', 'C', 'E'], t: 'socket', x: 357, y: 580, h: 30, n: [0, -1], w: 15, room: 'Дневна',
    bg: 'Двоен контакт до дивана (лампион, зарядно)' },
  { id: 'Л11', t: 'light', x: 593, y: 480, h: 174, n: [-1, 0], plate: false, room: 'Дневна',
    bg: 'LED под горните шкафове над дивана', note: 'захранването идва през тавана; ключът – с дневната' },
  { id: 'Т8', t: 'socket', x: 625, y: 505, h: 225, n: [1, 0], w: 15, room: 'Антре',
    bg: 'Контакт + интернет за рутера – горе в шкафа в антрето', note: 'по средата на апартамента – добро покритие' },
  { id: 'В2', variant: ['k1', 'k2', 'k3'], t: 'water', x: 698, y: 0, h: 50, n: [0, 1], w: 12, room: 'Кухня',
    bg: 'Вода (топла/студена) + канал – мивката под прозореца', note: 'оттук и за съдомиялната до нея' },
  { id: 'Т11', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 642, y: 0, h: 112, n: [0, 1], w: 15, room: 'Кухня', bg: 'Двоен контакт над плота до прозореца' },
  { id: 'Т12', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 30, h: 112, n: [-1, 0], w: 15, room: 'Кухня', bg: 'Двоен контакт в ъгъла (кафемашина, кана)' },
  { id: 'Т13', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 134, h: 112, n: [-1, 0], w: 15, room: 'Кухня', bg: 'Двоен контакт до котлона' },
  { id: 'Т14', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 75, h: 20, n: [-1, 0], w: 10, room: 'Кухня', bg: 'Котлон – 380V / отделен кръг', note: 'зад фурната, долу' },
  { id: 'Т15', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 705, y: 0, h: 30, n: [0, 1], w: 8, room: 'Кухня', bg: 'Контакт за съдомиялната', note: 'под мивката, не зад машината' },
  { id: 'Т16', t: 'socket', x: 660, y: 268, h: 210, n: [0, -1], w: 8, room: 'Кухня', bg: 'Контакт за хладилника', note: 'над хладилника, в шкафа' },
  { id: 'Т18', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 105, h: 20, n: [-1, 0], w: 8, room: 'Кухня', bg: 'Фурна под котлона – отделен кръг', note: 'зад фурната, долу' },
  { id: 'Т19', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 178, h: 195, n: [-1, 0], w: 8, plate: false, room: 'Кухня', bg: 'Контакт за вградената микровълнова', note: 'в горния шкаф над нея' },
  { id: 'Т20', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 190, h: 112, n: [-1, 0], w: 15, room: 'Кухня', bg: 'Двоен контакт над новия плот (миксер, тостер)' },
  { id: 'Т17', variant: ['k1', 'k2', 'k3'], t: 'socket', x: 780, y: 90, h: 200, n: [-1, 0], w: 8, plate: false, room: 'Кухня', bg: 'Контакт за абсорбатора', note: 'в шкафа над котлона' },
  { id: 'Л13', t: 'light', x: 690, y: 120, ceil: true, room: 'Кухня', bg: 'Луни на тавана в кухнята' },
  { id: 'Л14', t: 'light', x: 745, y: 75, h: 144, n: [-1, 0], plate: false, room: 'Кухня', bg: 'LED под горните шкафове', note: 'осветява плота и котлона' },
  { id: 'Л15', variant: ['k1', 'k2', 'k4'], t: 'light', x: 490, y: 165, ceil: true, room: 'Дневна', bg: 'Две висящи лампи над масата' },
  { id: 'Л15', variant: 'k3', t: 'light', x: 525, y: 165, ceil: true, room: 'Дневна', bg: 'Две висящи лампи над острова' },
  { id: 'Т27', variant: 'k3', t: 'socket', x: 560, y: 120, h: 3, floor: true, room: 'Кухня', bg: 'Подов контакт за острова', note: 'в замазката, под острова – контакт отстрани на острова' },
  { id: 'Т26', variant: 'k2', t: 'socket', x: 607, y: 0, h: 112, n: [0, 1], w: 15, room: 'Кухня', bg: 'Двоен контакт за кафе-станцията', note: 'между кухнята и голямата балконска врата' },
  { id: 'В2', variant: 'k4', t: 'water', x: 780, y: 30, h: 50, n: [-1, 0], w: 12, room: 'Кухня', bg: 'Вода + канал – мивката е на дясната стена до прозореца', note: 'оттук и за съдомиялната' },
  { id: 'Т15', variant: 'k4', t: 'socket', x: 780, y: 50, h: 30, n: [-1, 0], w: 8, room: 'Кухня', bg: 'Контакт за съдомиялната', note: 'под мивката, не зад машината' },
  { id: 'Т11', variant: 'k4', t: 'socket', x: 780, y: 85, h: 112, n: [-1, 0], w: 15, room: 'Кухня', bg: 'Двоен контакт над съдомиялната' },
  { id: 'Т13', variant: 'k4', t: 'socket', x: 780, y: 134, h: 112, n: [-1, 0], w: 15, room: 'Кухня', bg: 'Двоен контакт до котлона' },
  { id: 'Т14', variant: 'k4', t: 'socket', x: 780, y: 165, h: 20, n: [-1, 0], w: 10, room: 'Кухня', bg: 'Котлон – 380V / отделен кръг', note: 'зад фурната, долу' },
  { id: 'Т18', variant: 'k4', t: 'socket', x: 780, y: 195, h: 20, n: [-1, 0], w: 8, room: 'Кухня', bg: 'Фурна под котлона – отделен кръг', note: 'зад фурната, долу' },
  { id: 'Т17', variant: 'k4', t: 'socket', x: 780, y: 178, h: 200, n: [-1, 0], w: 8, plate: false, room: 'Кухня', bg: 'Контакт за абсорбатора', note: 'в шкафа над котлона' },
  { id: 'Т19', variant: 'k4', t: 'socket', x: 780, y: 90, h: 195, n: [-1, 0], w: 8, plate: false, room: 'Кухня', bg: 'Контакт за вградената микровълнова', note: 'в горния шкаф над нея' },
  { id: 'Т20', variant: 'k4', t: 'socket', x: 765, y: 268, h: 112, n: [0, -1], w: 15, room: 'Кухня', bg: 'Двоен контакт над ъгловия плот (кафемашина, тостер)' },
  { id: 'Т29', variant: 'C', t: 'socket', x: 515, y: 468, ceil: true, room: 'Дневна', bg: 'Таван: захранване + HDMI/интернет за проектора', note: 'тръба за HDMI до мястото на приставката/рутера' },
  { id: 'Т30', variant: 'C', t: 'socket', x: 509, y: 288, ceil: true, room: 'Дневна', bg: 'Таван: захранване за моторизирания екран (касета в тавана)', note: 'касетата се вгражда в окачения таван' },
  { id: 'Т10', variant: 'D', t: 'socket', x: 343, y: 518, h: 45, n: [1, 0], w: 22, room: 'Дневна', bg: 'Вариант Г: контакт + антена + интернет под прозореца', note: 'скрит зад ТВ шкафа' },
  { id: 'Т7', variant: 'D', t: 'socket', x: 440, y: 580, h: 30, n: [0, -1], w: 15, room: 'Дневна', bg: 'Двоен контакт (лампион)' },
  { id: 'Т28', variant: 'E', t: 'socket', x: 373, y: 225, h: 45, n: [-1, 0], w: 22, room: 'Спалня 1', bg: 'Вариант Д: контакт + антена + интернет за ТВ', note: 'зад ТВ шкафа на стената срещу дивана' },
  { id: 'К7', t: 'switch', x: 385, y: 300, h: 110, n: [1, 0], w: 15, room: 'Дневна', bg: 'Ключове: луни кухня, LED под шкафовете, лампи над масата' },
  { id: 'К8', t: 'switch', x: 750, y: 538, h: 110, n: [-1, 0], w: 15, room: 'Антре',
    bg: 'Двоен ключ за банята (до вратата, отвън): лампи + огледало', note: 'вентилаторът тръгва с лампата и работи с таймер' },
  { id: 'В3', variant: 'bA', t: 'water', x: 900, y: 466, h: 45, n: [-1, 0], w: 12, room: 'Баня',
    bg: 'Вода + сифон за пералнята', note: 'сушилнята (с термопомпа) източва в същия сифон' },
  { id: 'Т21', variant: 'bA', t: 'socket', x: 900, y: 450, h: 225, n: [-1, 0], w: 8, room: 'Баня', bg: 'Контакт за пералнята – отделен кръг, IP44', note: 'в шкафа над сушилнята – достъпен' },
  { id: 'Т22', variant: 'bA', t: 'socket', x: 900, y: 480, h: 225, n: [-1, 0], w: 8, room: 'Баня', bg: 'Контакт за сушилнята – отделен кръг, IP44', note: 'в шкафа над сушилнята' },
  { id: 'В4', variant: 'bA', t: 'water', x: 900, y: 552, h: 55, n: [-1, 0], w: 12, room: 'Баня', bg: 'Вода + канал за умивалника', note: 'смесителят е вграден в стената на 105 см; сифонът минава зад горното чекмедже' },
  { id: 'Т23', variant: 'bA', t: 'socket', x: 900, y: 590, h: 150, n: [-1, 0], w: 8, plate: false, room: 'Баня', bg: 'Контакт в огледалния шкаф (четка за зъби, самобръсначка) – IP44', note: '+ още един до него за сешоар' },
  { id: 'Л17', variant: 'bA', t: 'light', x: 900, y: 551, h: 114, n: [-1, 0], plate: false, room: 'Баня', bg: 'LED под огледалния шкаф' },
  { id: 'В5', t: 'water', x: 795, y: 698, h: 20, n: [0, -1], w: 12, room: 'Баня',
    bg: 'Висяща тоалетна: канал Ø110 + вода за вграденото казанче', note: 'инсталационна рамка – „полицата“ е 20 см дълбока и 110 см висока' },
  { id: 'В6', t: 'water', x: 963, y: 652, h: 105, n: [-1, 0], w: 12, room: 'Баня',
    bg: 'Душ: вграден смесител + таванен душ + ръчен душ', note: 'подът без праг, с наклон 1–2% към линейния сифон по стената; хидроизолация на пода и стените' },
  { id: 'Т24', t: 'socket', x: 762, y: 573, h: 40, n: [1, 0], w: 8, plate: false, room: 'Баня', bg: 'Скрито захранване за електрическата лира', note: 'с таймер' },
  { id: 'Л18', t: 'light', x: 798, y: 535, ceil: true, room: 'Баня', bg: 'Луни на тавана (IP44), едната над душа (IP65)' },
  { id: 'Д3', t: 'fan', x: 845, y: 640, ceil: true, room: 'Баня', bg: 'Вентилатор с таймер и датчик за влажност', note: 'банята е без прозорец – задължително' },
  { id: 'Л19', t: 'light', x: 920, y: 698, h: 144, n: [0, -1], plate: false, room: 'Баня', bg: 'LED в нишата на душа (IP65, 12V)' },
  { id: 'Л20', t: 'light', x: 60, y: 167, h: 222, n: [1, 0], plate: false, room: 'Спалня 1',
    bg: 'LED в гардероба – светва при отваряне', note: 'датчик на вратите; захранване от тавана' },
  { id: 'К9', t: 'switch', x: 373, y: 130, h: 110, n: [-1, 0], w: 8, room: 'Спалня 1', bg: 'Ключ – основна лампа, до вратата' },
  { id: 'Л21', t: 'light', x: 215, y: 167, ceil: true, room: 'Спалня 1', bg: 'Основна лампа – таван' },
  { id: 'Т25', t: 'socket', x: 373, y: 300, h: 30, n: [-1, 0], w: 15, room: 'Спалня 1', bg: 'Двоен контакт' },
];

// labels for layout variants (living room A–E, kitchen K1–K4)
export const VARIANT_LABEL = { A: 'хол А', B: 'хол Б', C: 'хол В', D: 'хол Г', E: 'хол Д', k1: 'кухня К1', k2: 'кухня К2', k3: 'кухня К3', k4: 'кухня К4' };
export const variantNote = (v) => {
  const l = [].concat(v || []).map((k) => VARIANT_LABEL[k]).filter(Boolean);
  return l.length ? `само при: ${l.join(', ')}` : '';
};

// ---------------------------------------------------------------- furniture list (shown in the side panel)
export const FURNITURE = [
  { name: 'Легло 160 × 200 с повдигащ механизъм', size: 'тапицирано, табла 180 × 120',
    mech: 'газови амортисьори – матракът се вдига, отдолу ракла за спално бельо и куфари' },
  { name: 'Нощни шкафчета (2 бр.)', size: '45 × 37 × 30, висящи, орех; откъм прозореца плотът продължава с дъска до 78 см',
    mech: '1 чекмедже, пълно изтегляне, push-to-open (Tip-On), плавно затваряне; дъската е за часовници и парфюми' },
  { name: 'Бюфет срещу леглото', size: '183 × 30 × 75, орех с релефни фронтове',
    mech: 'ляво и дясно: врати с push-to-open (кърпи, хавлии); средата: 3 чекмеджета – бижута (кадифе с отделения), парфюми, дребни неща' },
  { name: 'Тоалетка (продължение на бюфета)', size: '107 × 40, плот на 75 см',
    mech: 'плитко чекмедже push-to-open с органайзер за гримове' },
  { name: 'Дрешник – закачалки', size: '213 × 60, открито',
    mech: 'дълги дрехи 82 см + два реда закачалки 123 см, рафтове за обувки и кутии, LED лента' },
  { name: 'Дрешник – чекмеджета', size: '3 колони × 4 + 4 в дъното = 16 бр., 40 дълбоки',
    mech: 'пълно изтегляне с плавно затваряне; вдлъбнат профил отгоре за издърпване (без дръжки); отделения за бижута, бельо, чорапи, колани' },
  { name: 'Дрешник – шкафове горе', size: '3 бр., 70 × 130',
    mech: 'врати на скрити панти с push-to-open, по 2 рафта' },
  { name: 'Двустранна мебел на мястото на стената антре/дневна', size: '200 × 75 см, от пода до тавана',
    mech: 'заменя тухлената стена и вратата към дневната; закрепена за пода, тавана и стената на спалнята' },
  { name: '– откъм коридора: портманто', size: '40 дълбоко; коридорът остава 85 см',
    mech: 'ниша 1 м: закачалки, рафт за шапки с LED, пейка с възглавница и 2 чекмеджета за обувки (push); шкаф 1 м: 2 врати (едната огледало) – рафтове за обувки, прахосмукачка с контакт, дъска за гладене' },
  { name: '– откъм дневната: гръб за дивана', size: 'панел от релефни ламели до 175 см, над него шкафове 30 дълбоки до тавана',
    mech: 'ъглов диван 250 см с гръб към стената на спалнята, лежанката (165 × 90) е по мебелта; срещу него колона от пода до тавана с TV 65" (върти се към трапезарията) и няколко въртящи се рафтчета; отворен рафт над него на 128 см с LED ленти; горните шкафове с push врати и LED отдолу' },
  { name: 'Антре – огледало срещу входа', size: 'овално (капсула) 70 × 180, LED подсветка отзад; висяща конзола от орех 60 × 18 с заоблени краища',
    mech: 'конзолата има чекмедже с push и кадифе – ключове, портмонета, поща; отгоре керамична купичка за ключове. Входната врата е обърната да се отваря към банята' },
  { name: 'Кухня – П-образна, долу орех, горе топло бежово (не бяло)', size: 'мивка под прозореца, котлон на дясната стена, високи колони по стената към антрето',
    mech: 'без дръжки: чекмеджета с вдлъбнат профил, горни шкафове с вдигащи се нагоре врати (тип Aventos); вградена техника' },
  { name: '– под прозореца', size: 'съдомиялна 45 см + мивка 45 с кошчета за разделно',
    mech: 'нисък смесител – прозорецът се отваря навътре; ъгълът е сляп (отгоре кафемашина)' },
  { name: '– дясната стена', size: 'котлон 60 с 60 см плот вляво + тясна колона 28 за олио и подправки',
    mech: 'под котлона фурна + плитко чекмедже за тави; прибори, пособия и тенджери в чекмеджетата вдясно; над котлона вграден абсорбатор' },
  { name: '– фурна и микровълнова', size: 'фурната е под котлона; микровълновата е вградена в горния шкаф (дъно на 145 см)',
    mech: 'на мястото на колоната има още 60 см плот с 3 чекмеджета отдолу; към антрето: хладилник 60 + шкаф за продукти 30 до тавана' },
  { name: '– горни шкафове', size: '35 дълбоки, 2 реда до тавана над дясната стена',
    mech: 'чаши, чинии, подправки, горе кутии; LED отдолу; гръб от зелени zellige плочки' },
  { name: 'Хол – 2 варианта (превключват се в панела)', size: 'А: диван с гръб към спалнята, ТВ на колона | Б: диван с гръб към трапезарията, ТВ на стената към спалнята',
    mech: 'Б: диванът е отместен към телевизора, проходът от антрето (1 м) е свободен; висящ ТВ шкаф 150 × 35 с 3 чекмеджета (push), ТВ 55" на стената, ~1,6 м от очите' },
  { name: 'Хол – варианти В, Г, Д', size: 'В: падащ екран 100" + проектор на тавана | Г: диван с гръб към мебелта, ТВ 55" на нисък шкаф под прозореца | Д: без ТВ в хола, Спалня 1 става дневна с разтегателен диван и ТВ',
    mech: 'В: екранът се спуска/прибира с клик, проекторът е с къса прожекция (~1,8 м); Г: шкаф 122 × 38 с 2 чекмеджета (push); Д: ТВ шкаф 120 × 35 в Спалня 1' },
  { name: 'Кухня – варианти К2, К3, К4', size: 'К2: + кафе-станция 45 × 40 см до голямата балконска врата | К3: остров 130 × 70 с 3 стола вместо масата | К4: Г-образна, без шкафовете под прозореца',
    mech: 'К2: 2 чекмеджета, рафтове за чаши, горен шкаф; К3: 6 чекмеджета към кухнята, плот с 25 см надвес; К4: мивка до прозореца, съдомиялна, чекмеджета, котлон с фурна, микровълнова в горния шкаф' },
  { name: 'Трапезария', size: 'овална маса 140 × 90 от орех на един крак + 4 заоблени тапицирани стола',
    mech: '2 висящи лампи-сфери над масата' },
  { name: 'Баня – шкаф за пералня и сушилня', size: '65 × 65, от пода до тавана, на дясната стена',
    mech: 'пералня + сушилня една върху друга с рафт-поставка между тях, врата пред тях (push); горе препарати и кърпи' },
  { name: '– умивалник 100 см', size: 'каменен плот с вградена мивка, висящ шкаф 48 дълбок',
    mech: 'горно чекмедже за козметика; отдолу 3 издърпващи се коша за пране – бяло, тъмно, цветно; над него огледален шкаф 100 × 70 с LED и рафт за кърпи' },
  { name: '– висяща тоалетна', size: 'вградено казанче в облицована „полица“ 20 × 110 см; над нея вграден шкаф 102 × 20 от 140 см до тавана',
    mech: 'бутонът е в черно, отгоре полица от орех; шкафът е на една линия с полицата, 2 врати с push, 2 рафта вътре (тоалетна хартия, резервна козметика, препарати, кърпи), LED отдолу' },
  { name: '– душ 90 × 92 на нивото на плочките', size: 'линеен сифон по стената, без праг',
    mech: 'стъклена врата + неподвижни стъкла с тънък черен профил; таванен душ, ръчен душ, ниша с LED' },
  { name: '– облицовка', size: 'плочки 60 × 120 с вид на камък, до тавана',
    mech: 'черна електрическа лира за кърпи на лявата стена; вратата на банята е 70 см и се отваря плътно към горната стена' },
  { name: 'Спалня 1 – вграден гардероб', size: '335 × 60, от пода до тавана, по стената срещу вратата',
    mech: '6 високи + 6 горни врати от орех с push, без дръжки; вътре: дълги дрехи + обувки | два реда закачалки | рафтове | 4 вътрешни чекмеджета (бижута, бельо, тениски) + рафтове; горе кутии; LED, който светва при отваряне' },
];

// ---------------------------------------------------------------- materials
const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, ...opts });
const C = {
  oak: mat('#c9a77c', { roughness: 0.6 }),
  oakDark: mat('#a9875f', { roughness: 0.6 }),
  walnut: mat('#7a5e4d', { roughness: 0.55 }),
  white: mat('#f1ede6', { roughness: 0.5 }),
  front: mat('#ece7de', { roughness: 0.45 }),
  black: mat('#232323', { roughness: 0.4, metalness: 0.4 }),
  fabric: mat('#b7ae9f', { roughness: 0.95 }),
  linen: mat('#f4f1ea', { roughness: 0.95 }),
  duvet: mat('#ebe6dc', { roughness: 0.95 }),
  sage: mat('#8e9c86', { roughness: 0.95 }),
  rug: mat('#d6cdbf', { roughness: 1 }),
  curtain: mat('#e8e2d6', { roughness: 1, side: THREE.DoubleSide }),
  mirror: mat('#c3d0d6', { roughness: 0.08, metalness: 0.15 }),
  lampShade: new THREE.MeshStandardMaterial({ color: '#f3e6cf', emissive: '#ffd9a0', emissiveIntensity: 0.9, roughness: 0.8 }),
  lightGlow: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff4e0', emissiveIntensity: 1.2 }),
  plate: mat('#fbfbfa', { roughness: 0.4 }),
  box: mat('#d9cdb9', { roughness: 0.9 }),
  inner: mat('#c9a77c', { roughness: 0.6 }),          // light oak inside carcasses and drawers
  metal: mat('#a7adb2', { roughness: 0.3, metalness: 0.8 }),
  metalDark: mat('#6d7277', { roughness: 0.35, metalness: 0.7 }),
  grip: mat('#24170f', { roughness: 0.8 }),           // shadow of the grip groove
  lining: mat('#cfc8bc', { roughness: 1 }),
  velvet: mat('#4d5a52', { roughness: 1 }),
  velvetDark: mat('#3a443e', { roughness: 1 }),
};

function flutedWood() {
  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 4;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 32, 0);
  grad.addColorStop(0, '#574335');
  grad.addColorStop(0.2, '#8f7462');
  grad.addColorStop(0.6, '#7a5e4d');
  grad.addColorStop(1, '#574335');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 4);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(24, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 });
}

function flutedGlass() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 4;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 64, 0);
  grad.addColorStop(0, '#9c958a');
  grad.addColorStop(0.45, '#f4f1ea');
  grad.addColorStop(0.8, '#d4cec3');
  grad.addColorStop(1, '#9c958a');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 4);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(22, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshPhysicalMaterial({ map: t, color: '#efe9de', transparent: true, opacity: 0.62,
    roughness: 0.25, depthWrite: false, side: THREE.DoubleSide });
}

// ---------------------------------------------------------------- build
export function buildInterior({ box, M, group, colliders, addDoor, pickables, H }) {
  const realGroup = group;
  const variants = {};
  const mkVariant = (key, build) => {                                   // build furniture into a switchable group
    const g = new THREE.Group(); realGroup.add(g);
    const prev = group; group = g;
    const c0 = colliders.length; build();
    variants[key] = { g, cols: colliders.splice(c0) };
    group = prev;
  };
  const b = (x1, y1, x2, y2, z0, z1, m, parent = group) => box(x1, y1, x2, y2, z0, z1, m, parent);
  const block = (r) => colliders.push(r.map(M));
  const rnd = (() => { let s = 7; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); })();

  const cylinder = (x, y, z0, z1, r, m, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(M(r), M(r), M(z1 - z0), 28), m);
    mesh.position.set(M(x), M((z0 + z1) / 2), M(y));
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const rail = (x1, x2, y, z) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(M(1.2), M(1.2), M(x2 - x1), 12), C.black);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(M((x1 + x2) / 2), M(z), M(y));
    group.add(mesh);
  };
  const palette = ['#2f3a4a', '#8c6d5a', '#d8cfc4', '#5b6b5a', '#9e3f3a', '#e8e2d6', '#3d3d3d', '#b48a6b', '#6d7f99', '#efe9df', '#c7b49b'];
  const garments = (x1, x2, y1, y2, top, minLen, maxLen) => {
    for (let x = x1 + 3; x < x2 - 4; x += 3.6 + rnd() * 2.5) {
      const len = minLen + rnd() * (maxLen - minLen);
      const m = mat(palette[(rnd() * palette.length) | 0], { roughness: 1 });
      const g = b(x, y1 + rnd() * 3, x + 2.4, y2 - rnd() * 3, top - len, top - 3, m);
      g.castShadow = false;
    }
  };

  // ======================= BEDROOM =======================
  // rug
  b(398, 655, 658, 860, 0, 1, C.rug).castShadow = false;

  // ======================= MECHANISMS =======================
  // A front is described in its own frame: u runs along the front, v is the distance out of the
  // front face (v < 0 = inside the unit). n = outward direction in plan, f = plan coordinate of the face.
  const frame = ([nx, ny], f) => (u1, u2, v1, v2) => {
    if (ny) { const a = f + ny * v1, c = f + ny * v2; return [u1, Math.min(a, c), u2, Math.max(a, c)]; }
    const a = f + nx * v1, c = f + nx * v2; return [Math.min(a, c), u1, Math.max(a, c), u2];
  };
  const centerOf = (n, f, u1, u2) => { const r = frame(n, f)((u1 + u2) / 2, (u1 + u2) / 2, 0, 0); return new THREE.Vector2(M(r[0]), M(r[1])); };
  const tag = (mesh, part) => { mesh.userData.door = part; pickables.push(mesh); return mesh; };
  const fluted = (w) => { const m = flutedWood(); m.map.repeat.set(Math.max(4, Math.round(w / 2.6)), 1); return m; };
  const register = (part) => { part.furniture = true; part.frac = 0; part.target = 0; part.apply(); addDoor(part); return part; };
  const quiet = (m) => { m.castShadow = false; return m; };

  // carcass open at the front
  function shell(n, f, u1, u2, depth, z0, z1, m, t = 1.8) {
    const fr = frame(n, f);
    b(...fr(u1, u1 + t, -depth, -2), z0, z1, m);
    b(...fr(u2 - t, u2, -depth, -2), z0, z1, m);
    b(...fr(u1, u2, -depth, -depth + t), z0, z1, m);
    b(...fr(u1, u2, -depth, -2), z0, z0 + t, m);
    b(...fr(u1, u2, -depth, -2), z1 - t, z1, m);
  }

  // drawer on full-extension soft-close runners; grip 'push' (push-to-open latch) or 'top' (grip groove on top)
  function drawer({ n, f, u1, u2, z0, z1, depth, front, grip = 'push', fill }) {
    const fr = frame(n, f);
    const g = new THREE.Group();
    group.add(g);
    const part = { kind: 'drawer' };
    const add = (r, za, zb, m, pick = true) => { const mesh = quiet(b(...r, za, zb, m, g)); if (pick) tag(mesh, part); return mesh; };
    const zt = grip === 'top' ? z1 - 2.8 : z1 - 0.2;
    add(fr(u1 + 0.2, u2 - 0.2, -2, 0), z0 + 0.2, zt, front).castShadow = true;
    if (grip === 'top') add(fr(u1 + 0.2, u2 - 0.2, -2, -1.2), zt, z1 - 0.2, C.grip);
    const ua = u1 + 2.6, ub = u2 - 2.6, vb = -depth + 4, zb = z0 + 1.5;
    const zh = Math.max(zb + 6, z1 - 4.5);
    add(fr(ua, ub, vb, -2), zb, zb + 1, C.inner);
    add(fr(ua, ua + 1.2, vb, -2), zb, zh, C.inner);
    add(fr(ub - 1.2, ub, vb, -2), zb, zh, C.inner);
    add(fr(ua, ub, vb, vb + 1.2), zb, zh, C.inner);
    add(fr(ua - 1.1, ua, vb, -3), zb + 1, zb + 2.6, C.metal, false);       // moving runner
    add(fr(ub, ub + 1.1, vb, -3), zb + 1, zb + 2.6, C.metal, false);
    quiet(b(...fr(ua - 1.6, ua - 1.1, -depth + 2, -3), zb + 0.6, zb + 3, C.metalDark)); // fixed runner
    quiet(b(...fr(ub + 1.1, ub + 1.6, -depth + 2, -3), zb + 0.6, zb + 3, C.metalDark));
    if (grip === 'push') {                                                // Tip-On latch at the back
      const uc = (u1 + u2) / 2, zc = (zb + zh) / 2;
      quiet(b(...fr(uc - 2.5, uc + 2.5, -depth + 1.8, vb), zc - 1.5, zc + 1.5, C.metalDark));
    }
    if (fill) {
      const api = { u1: ua + 1.2, u2: ub - 1.2, v1: vb + 1.2, v2: -2.2, z: zb + 1, h: zh - zb - 1,
        add: (a1, a2, c1, c2, za, zb2, m) => add(fr(a1, a2, c1, c2), za, zb2, m, false),
        cyl: (u, v, za, zb2, r, m) => { const pt = fr(u, u, v, v); quiet(cylinder(pt[0], pt[1], za, zb2, r, m, g)); } };
      fill(api);
    }
    const travel = depth * 0.85;
    part.center = centerOf(n, f, u1, u2);
    part.apply = () => { g.position.x = M(n[0] * travel * part.frac); g.position.z = M(n[1] * travel * part.frac); };
    return register(part);
  }

  // hinged door on concealed (cup) hinges with push-to-open
  function hingeDoor({ n, f, u1, u2, z0, z1, hinge = 'u1', front }) {
    const fr = frame(n, f);
    const part = { kind: 'hinge' };
    const hu = hinge === 'u1' ? u1 + 0.2 : u2 - 0.2;
    const hp = fr(hu, hu, -1, -1);
    const pivot = new THREE.Group();
    pivot.position.set(M(hp[0]), 0, M(hp[1]));
    group.add(pivot);
    const inner = new THREE.Group();
    inner.position.set(-M(hp[0]), 0, -M(hp[1]));
    pivot.add(inner);
    tag(b(...fr(u1 + 0.2, u2 - 0.2, -2, 0), z0 + 0.2, z1 - 0.2, front, inner), part);
    const [c1, c2] = hinge === 'u1' ? [u1 + 2, u1 + 7] : [u2 - 7, u2 - 2];
    for (const z of [z0 + 8, z1 - 14]) quiet(b(...fr(c1, c2, -3.2, -2), z, z + 6, C.metal, inner));
    const lu = hinge === 'u1' ? u2 - 4 : u1 + 1;                           // push latch on the carcass
    quiet(b(...fr(lu, lu + 3, -5, -2.2), (z0 + z1) / 2 - 2, (z0 + z1) / 2 + 2, C.metalDark));
    const s = hinge === 'u1' ? 1 : -1;
    const d = n[1] ? [s, 0] : [0, s];
    const sign = d[1] === n[0] && -d[0] === n[1] ? 1 : -1;
    part.center = centerOf(n, f, u1, u2);
    part.apply = () => { pivot.rotation.y = sign * 1.65 * part.frac; };
    return register(part);
  }

  // ---- contents helpers
  const linenCols = ['#e9e3d8', '#cfc4b3', '#a9b3a1', '#d8c2ad', '#8f9a8a', '#bfb2a2'];
  const clothCols = ['#2f3a4a', '#8c6d5a', '#d8cfc4', '#5b6b5a', '#9e3f3a', '#e8e2d6', '#3d3d3d', '#b48a6b', '#6d7f99', '#c7b49b'];
  const pick = (arr) => mat(arr[(rnd() * arr.length) | 0], { roughness: 0.95 });
  const grid = (a, nu, nv, hh = 5, m = C.inner) => {
    for (let i = 1; i < nu; i++) { const u = a.u1 + (i * (a.u2 - a.u1)) / nu; a.add(u - 0.4, u + 0.4, a.v1, a.v2, a.z, a.z + Math.min(hh, a.h), m); }
    for (let j = 1; j < nv; j++) { const v = a.v1 + (j * (a.v2 - a.v1)) / nv; a.add(a.u1, a.u2, v - 0.4, v + 0.4, a.z, a.z + Math.min(hh, a.h), m); }
  };
  const folded = (a, cols, colors, layer = 4, fillRatio = 0.85) => {
    const w = (a.u2 - a.u1) / cols;
    for (let c = 0; c < cols; c++) {
      const layers = Math.max(1, Math.floor((a.h * fillRatio) / layer) - (c % 2));
      for (let k = 0; k < layers; k++) {
        const j = (rnd() - 0.5) * 1.5;
        a.add(a.u1 + c * w + 1 + j, a.u1 + (c + 1) * w - 1 + j, a.v1 + 1, a.v2 - 1, a.z + k * layer, a.z + (k + 1) * layer - 0.3, pick(colors));
      }
    }
  };
  const smalls = (a, nu, nv, colors, hmax) => {
    for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
      const u = a.u1 + ((i + 0.5) * (a.u2 - a.u1)) / nu, v = a.v1 + ((j + 0.5) * (a.v2 - a.v1)) / nv;
      if (rnd() < 0.25) continue;
      const kind = rnd();
      if (kind < 0.5) a.cyl(u, v, a.z, a.z + 1 + rnd() * hmax, 0.8 + rnd() * 1.6, pick(colors));
      else a.add(u - 2 - rnd() * 2, u + 2 + rnd() * 2, v - 1.5 - rnd() * 2, v + 1.5 + rnd() * 2, a.z, a.z + 0.6 + rnd() * hmax * 0.4, pick(colors));
    }
  };
  const gold = ['#c9a65a', '#d9d4cc', '#b08a5a', '#8c8c8c'];
  const makeup = ['#2a2a2a', '#c58b7a', '#9e3f3a', '#e3c9a8', '#7a5a4a', '#d9b8a8'];
  const perfume = (a) => {
    const pts = [[0.15, 0.3], [0.38, 0.65], [0.6, 0.3], [0.82, 0.62], [0.25, 0.75], [0.7, 0.8]];
    for (const [pu, pv] of pts) {
      const u = a.u1 + pu * (a.u2 - a.u1), v = a.v1 + pv * (a.v2 - a.v1), hh = Math.min(a.h - 1, 8 + rnd() * 6);
      a.cyl(u, v, a.z, a.z + hh, 2.5 + rnd() * 1.2, mat(['#e9d6b8', '#cfe0e6', '#f0c9c0', '#d8d0f0'][(rnd() * 4) | 0], { roughness: 0.1, transparent: true, opacity: 0.8 }));
      a.cyl(u, v, a.z + hh, a.z + hh + 2, 1.2, mat('#c9a65a', { metalness: 0.7, roughness: 0.3 }));
    }
  };

  // ======================= BED with lift-up storage =======================
  b(438, 892, 618, 897, 0, 120, C.fabric);                 // headboard
  b(446, 697, 610, 701, 6, 31, C.fabric);                  // storage box sides
  b(446, 888, 610, 892, 6, 31, C.fabric);
  b(446, 701, 450, 888, 6, 31, C.fabric);
  b(606, 701, 610, 888, 6, 31, C.fabric);
  quiet(b(450, 701, 606, 888, 6, 7.5, C.lining));          // storage floor
  quiet(b(527, 701, 529, 888, 7.5, 30, C.lining));         // divider
  quiet(b(456, 708, 522, 790, 7.5, 24, mat('#d9d3c7')));   // spare duvet (vacuum bag)
  quiet(b(458, 800, 520, 880, 7.5, 19, mat('#b9c2b0')));   // winter blanket
  quiet(b(536, 712, 600, 866, 7.5, 27, mat('#5f5a54')));   // suitcase
  const bed = { kind: 'bed' };
  const lid = new THREE.Group();
  lid.position.set(M(528), M(31), M(886));
  group.add(lid);
  const lidIn = new THREE.Group();
  lidIn.position.set(-M(528), -M(31), -M(886));
  lid.add(lidIn);
  const lb = (...a) => tag(b(...a, lidIn), bed);
  lb(446, 697, 610, 892, 31, 33, C.fabric);                // upholstered platform
  lb(448, 699, 608, 890, 33, 55, C.linen);                 // mattress
  lb(444, 697, 612, 842, 38, 60, C.duvet);                 // duvet
  lb(443, 700, 613, 745, 60, 62, C.sage);                  // throw
  lb(456, 846, 524, 886, 55, 72, C.linen);                 // pillows
  lb(532, 846, 600, 886, 55, 72, C.linen);
  lb(466, 838, 590, 852, 58, 74, C.sage);
  const struts = [470, 586].map((x) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(M(1.1), M(1.1), 1, 10), C.metal);
    group.add(m);
    return { m, a: new THREE.Vector3(M(x), M(12), M(870)), local: new THREE.Vector3(M(x), M(29), M(790)) };
  });
  const up = new THREE.Vector3(0, 1, 0), tmp = new THREE.Vector3();
  bed.center = new THREE.Vector2(M(528), M(795));
  bed.apply = () => {
    lid.rotation.x = 0.72 * bed.frac;
    lid.updateMatrixWorld(true);
    for (const s of struts) {
      const bpt = lidIn.localToWorld(tmp.copy(s.local));
      const dir = bpt.clone().sub(s.a);
      s.m.scale.set(1, dir.length(), 1);
      s.m.position.copy(s.a).addScaledVector(dir, 0.5);
      s.m.quaternion.setFromUnitVectors(up, dir.normalize());
      s.m.visible = bed.frac > 0.02;
    }
  };
  register(bed);
  block([438, 697, 618, 897]);

  // ======================= NIGHTSTANDS (walnut, floating, push-to-open) =======================
  for (const [x1, x2] of [[391, 436], [620, 665]]) {
    shell([0, -1], 855, x1, x2, 37, 25, 55, C.walnut);
    drawer({ n: [0, -1], f: 855, u1: x1, u2: x2, z0: 26.8, z1: 53.2, depth: 35, front: C.walnut, fill: (a) => {
      a.add(a.u1 + 2, a.u1 + 18, a.v1 + 3, a.v1 + 25, a.z, a.z + 2.5, mat('#7a8a99'));       // book
      a.add(a.u1 + 22, a.u1 + 36, a.v1 + 4, a.v1 + 10, a.z, a.z + 3, mat('#3b3b3b'));        // glasses case
      a.cyl(a.u1 + 28, a.v1 + 20, a.z, a.z + 2, 4, mat('#d9d4cc'));                         // charger
      a.add(a.u1 + 22, a.u1 + 34, a.v1 + 25, a.v2 - 2, a.z, a.z + 1.5, mat('#c58b7a'));      // notebook
    } });
    block([x1, 855, x2, 892]);
    const cx = (x1 + x2) / 2;
    b(cx - 1, 885, cx + 1, 897, 149, 151, C.black);                 // sconce arm
    cylinder(cx, 885, 140, 156, 9, C.lampShade).castShadow = false; // shade
    b(cx - 10, 862, cx + 8, 882, 55, 58, mat('#7a8a99'));          // book on top
  }

  // his side (window side): the nightstand top continues as a floating walnut board – watches, perfume
  // (stops 15 cm before the wall so the curtain can still hang down)
  b(358, 855, 391, 892, 53.2, 55, C.walnut);
  quiet(b(362, 858, 388, 874, 55, 56.2, mat('#3b2a20', { roughness: 0.5 })));   // leather valet tray
  for (const [x, y] of [[367, 863], [375, 866], [383, 864]]) {                  // watches
    quiet(b(x - 1.2, y - 4, x + 1.2, y + 4, 56.2, 56.8, mat('#2a2a2a', { roughness: 0.6 })));
    quiet(cylinder(x, y, 56.2, 57.6, 2.1, C.metal));
  }
  for (const [x, c, hh] of [[365, '#e9d6b8', 12], [373, '#cfd6da', 10], [381, '#6b4a3a', 13]]) {   // perfume
    quiet(cylinder(x, 884, 55, 55 + hh, 2.8, mat(c, { roughness: 0.1, transparent: true, opacity: 0.85 })));
    quiet(cylinder(x, 884, 55 + hh, 57 + hh, 1.3, mat('#1f1f1f', { roughness: 0.3 })));
  }
  block([358, 855, 391, 892]);

  // ======================= SIDEBOARD (fluted walnut, 183 x 30 x 75) =======================
  {
    const n = [0, 1], f = 635, fr = frame(n, f);
    quiet(b(452, 605, 635, 627, 0, 8, C.black));                     // recessed plinth
    shell(n, f, 452, 635, 30, 8, 72, C.walnut);
    b(450, 605, 637, 635, 72, 75, C.walnut);                         // top (continues over the dressing table)
    for (const u of [512.2, 573.8]) b(...fr(u, u + 1.8, -30, -2), 8, 72, C.walnut);
    // left: towels on a shelf
    quiet(b(...fr(453.8, 512.2, -28, -3), 39, 40.8, C.inner));
    folded({ u1: 455, u2: 511, v1: -27, v2: -4, z: 9.8, h: 28, add: (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m)) }, 2, linenCols, 4.5);
    for (let k = 0; k < 4; k++) {                                     // rolled towels on top
      const r = new THREE.Mesh(new THREE.CylinderGeometry(M(5.5), M(5.5), M(22), 20), pick(linenCols));
      r.rotation.x = Math.PI / 2;
      r.position.set(M(460 + k * 13), M(46.5), M(620));
      group.add(r);
    }
    hingeDoor({ n, f, u1: 452, u2: 512.8, z0: 8.5, z1: 72, hinge: 'u1', front: fluted(60) });
    // middle: three drawers – jewellery, perfume, small things
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 51, z1: 72, depth: 28, front: fluted(61), fill: (a) => {
      a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvet);
      const a2 = { ...a, z: a.z + 0.6, h: 4 };
      grid(a2, 4, 2, 3.5, C.velvetDark);
      smalls(a2, 8, 4, gold, 2);
    } });
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 29.5, z1: 51, depth: 28, front: fluted(61), fill: perfume });
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 8.5, z1: 29.5, depth: 28, front: fluted(61), fill: (a) => {
      grid(a, 3, 1, 8);
      smalls(a, 6, 3, ['#d9c7b0', '#8a7e70', '#efe9df', '#6b4a3a'], 9);
    } });
    // right: shelves for towels / bathrobe / boxes
    for (const z of [30, 51]) quiet(b(...fr(575.6, 633.2, -28, -3), z, z + 1.8, C.inner));
    const rAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m));
    folded({ u1: 576, u2: 632, v1: -27, v2: -4, z: 9.8, h: 19, add: rAdd }, 2, linenCols, 4.5);
    folded({ u1: 576, u2: 632, v1: -27, v2: -4, z: 31.8, h: 18, add: rAdd }, 1, ['#cfc4b3', '#e9e3d8'], 6);
    rAdd(578, 602, -26, -6, 52.8, 66, mat('#c9b9a3'));
    rAdd(606, 630, -26, -6, 52.8, 63, mat('#8f9a8a'));
    hingeDoor({ n, f, u1: 574.4, u2: 635, z0: 8.5, z1: 72, hinge: 'u2', front: fluted(60) });
  }
  for (const z of [125, 162]) b(462, 605, 628, 620, z, z + 3, C.walnut);
  // leaning frames on the shelves
  const art = ['#efe9df', '#3a3a3a', '#d9b8a8', '#cfc6b8', '#8a5a4a', '#f4efe6', '#6f7d6b'];
  [[125, [[466, 30, 36], [500, 26, 30], [530, 34, 40], [570, 24, 28], [598, 28, 32]]],
   [162, [[470, 26, 30], [502, 30, 38], [540, 34, 42], [584, 26, 30]]]].forEach(([z, items], k) => {
    items.forEach(([x, w, h], j) => {
      quiet(b(x, 608, x + w, 610.5, z + 3, z + 3 + h, mat(art[(j + k * 2) % art.length], { roughness: 0.9 })));
    });
  });
  // on top: globe table lamp, vase with branches, books
  cylinder(608, 620, 75, 79, 6, C.oakDark);
  {
    const globe = new THREE.Mesh(new THREE.SphereGeometry(M(14), 32, 20), C.lampShade);
    globe.position.set(M(608), M(93), M(620));
    group.add(globe);
  }
  cylinder(572, 620, 75, 100, 6, mat('#d8cbb6', { roughness: 0.8 }));
  for (let k = 0; k < 7; k++) {
    const twig = new THREE.Mesh(new THREE.CylinderGeometry(M(0.4), M(0.4), M(40), 4), mat('#6b4a3a'));
    twig.position.set(M(572 + (k - 3) * 3), M(118), M(620 + ((k % 3) - 1) * 2));
    twig.rotation.z = (k - 3) * 0.12;
    group.add(twig);
  }
  b(470, 612, 500, 630, 75, 78, mat('#e9e2d4'));
  b(472, 613, 498, 629, 78, 80, mat('#b9a58c'));
  b(512, 612, 540, 630, 75, 78, mat('#6b4a3a', { roughness: 0.4 }));  // tray
  block([450, 605, 637, 635]);

  // ======================= DRESSING TABLE (one piece with the sideboard) =======================
  b(343, 605, 450, 645, 72, 75, C.walnut);                // top, 107 x 40
  b(343, 605, 345, 643, 59, 72, C.walnut);                // drawer housing
  b(448.2, 605, 450, 643, 59, 72, C.walnut);
  b(345, 605, 448.2, 607, 59, 72, C.walnut);
  drawer({ n: [0, 1], f: 645, u1: 345, u2: 450, z0: 59, z1: 72, depth: 38, front: fluted(105), fill: (a) => {
    a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.5, C.velvet);
    const a2 = { ...a, z: a.z + 0.5, h: 5 };
    grid(a2, 6, 2, 4.5, C.inner);
    smalls(a2, 12, 4, makeup, 4);
  } });
  {
    const glow = new THREE.Mesh(new THREE.CylinderGeometry(M(32), M(32), M(1), 48), C.lightGlow);
    glow.rotation.x = Math.PI / 2;
    glow.position.set(M(394), M(140), M(605.6));
    group.add(glow);
    const mirror = new THREE.Mesh(new THREE.CylinderGeometry(M(30), M(30), M(1.5), 48), C.mirror);
    mirror.rotation.x = Math.PI / 2;
    mirror.position.set(M(394), M(140), M(607));
    group.add(mirror);
  }
  for (const x of [352, 436]) {                           // lights either side of the mirror
    b(x - 3, 605, x + 3, 607, 112, 168, C.black);
    quiet(b(x - 2, 607, x + 2, 610, 114, 166, C.lightGlow));
  }
  b(355, 615, 375, 635, 75, 78, C.oakDark);               // tray
  cylinder(420, 625, 75, 89, 3, mat('#e3c9a8', { roughness: 0.2 }));
  cylinder(394, 672, 0, 45, 17, C.sage);                  // stool
  block([343, 605, 450, 645]);
  block([377, 655, 411, 689]);

  // main ceiling light
  quiet(cylinder(546, 751, H - 3, H, 22, C.lightGlow));

  // curtains on the west window (pulled to the sides)
  quiet(b(347, 650, 349, 894, 246, 248, C.black));
  for (const [y1, y2] of [[652, 694], [842, 890]]) {
    for (let k = 0; k < 6; k++) {
      const y = y1 + k * ((y2 - y1) / 6);
      quiet(b(348 + (k % 2) * 3, y, 352 + (k % 2) * 3, y + (y2 - y1) / 6 + 1, 4, 244, C.curtain));
    }
  }

  // ======================= WALK-IN CLOSET (walnut, no handles) =======================
  // --- top run along the bathroom wall: open hanging, 60 deep (y 710–770)
  const T = { y1: 710, y2: 770 };
  b(754, T.y1, 756, T.y2, 0, 260, C.walnut);          // end panel
  b(838, T.y1, 840, T.y2, 0, 260, C.walnut);          // divider
  b(754, T.y1, 963, T.y2, 258, 260, C.walnut);        // top
  quiet(b(756, T.y1, 963, T.y2, 0, 4, C.black));      // plinth
  // section 1: long hanging (dresses, coats) + shoe shelves below
  b(756, T.y1, 838, T.y2, 205, 207, C.inner);
  b(756, T.y1, 838, T.y2, 232, 234, C.inner);
  rail(756, 838, 740, 196);
  garments(756, 838, 718, 762, 194, 105, 145);
  b(756, T.y1, 838, T.y2 - 5, 12, 14, C.inner);
  b(756, T.y1, 838, T.y2 - 5, 32, 34, C.inner);
  for (let x = 760; x < 832; x += 13) {
    const m = mat(palette[(rnd() * palette.length) | 0]);
    quiet(b(x, 738, x + 10, 765, 14, 22, m));
    quiet(b(x, 738, x + 10, 765, 34, 42, m));
  }
  // section 2: double hanging (shirts / trousers)
  b(840, T.y1, 963, T.y2, 205, 207, C.inner);
  b(840, T.y1, 963, T.y2, 232, 234, C.inner);
  b(840, T.y1, 963, T.y2, 108, 110, C.inner);
  rail(840, 963, 740, 196);
  rail(840, 963, 740, 100);
  garments(840, 960, 718, 762, 194, 70, 82);
  garments(840, 960, 720, 760, 98, 55, 62);
  for (let x = 760; x < 950; x += 40) quiet(b(x, 716, x + 35, 764, 234, 256, C.box));
  block([754, T.y1, 963, T.y2]);

  // --- bottom run along the south wall, 40 deep: 3 x 4 drawers (grip groove on top) + cabinets above
  {
    const n = [0, -1], f = 857, fr = frame(n, f);
    const cols = [[754, 823.7], [823.7, 893.3], [893.3, 963]];
    shell(n, f, 754, 963, 40, 4, 95, C.walnut);
    shell(n, f, 754, 963, 40, 130, 260, C.walnut);
    for (const u of [822, 891.6]) { b(...fr(u, u + 1.8, -40, -2), 4, 95, C.walnut); b(...fr(u, u + 1.8, -40, -2), 130, 260, C.walnut); }
    quiet(b(754, 857, 963, 897, 0, 4, C.black));
    b(754, 857, 963, 897, 95, 98, C.walnut);               // worktop
    b(754, 879, 963, 897, 98, 130, C.inner);              // open niche (jewellery, perfume)
    b(770, 870, 810, 892, 98, 101, C.oakDark);
    cylinder(840, 882, 98, 112, 3, mat('#e3c9a8', { roughness: 0.2 }));
    cylinder(850, 886, 98, 108, 2.5, mat('#9fb3c2', { roughness: 0.2 }));
    // drawer contents, top drawer first, per column (hers / shared / his)
    const fills = [
      [(a) => { a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvet); const a2 = { ...a, z: a.z + 0.6, h: 4 }; grid(a2, 5, 3, 3.5, C.velvetDark); smalls(a2, 10, 6, gold, 2); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, ['#e8e2d6', '#d9b8a8', '#2a2a2a', '#c7b49b'], 6); },
       (a) => folded(a, 3, clothCols, 3),
       (a) => folded(a, 2, clothCols, 5)],
      [(a) => { grid(a, 4, 2, 9); for (let i = 0; i < 8; i++) a.cyl(a.u1 + 7 + (i % 4) * ((a.u2 - a.u1 - 14) / 3), a.v1 + 8 + ((i / 4) | 0) * 16, a.z, a.z + 4, 4, pick(['#3d2b20', '#2a2a2a', '#6b4a3a', '#2f3a4a'])); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, clothCols, 5); },
       (a) => folded(a, 3, clothCols, 3.5),
       (a) => folded(a, 2, linenCols, 5)],
      [(a) => { a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvetDark); const a2 = { ...a, z: a.z + 0.6, h: 4 }; grid(a2, 4, 2, 3.5, C.inner); smalls(a2, 6, 3, ['#8c8c8c', '#2a2a2a', '#c9a65a'], 3); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, ['#2a2a2a', '#2f3a4a', '#d9d4cc'], 6); },
       (a) => folded(a, 3, clothCols, 3),
       (a) => folded(a, 2, ['#2f3a4a', '#3d4a5e', '#5b6b7a', '#2a2a2a'], 5)],
    ];
    const zs = [[72.5, 95], [50, 72.5], [27.5, 50], [5, 27.5]];
    cols.forEach(([u1, u2], c) => {
      zs.forEach(([z0, z1], i) => drawer({ n, f, u1, u2, z0, z1, depth: 38, front: C.walnut, grip: 'top', fill: fills[c][i] }));
      // cabinet above: two shelves, push-to-open door
      const iu1 = u1 + (c === 0 ? 1.8 : 1.8), iu2 = u2 - 1.8;
      const sAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m));
      for (const z of [172, 215]) sAdd(iu1, iu2, -38, -3, z, z + 1.8, C.inner);
      folded({ u1: iu1 + 1, u2: iu2 - 1, v1: -36, v2: -5, z: 131.8, h: 38, add: sAdd }, 2, clothCols, 7);
      folded({ u1: iu1 + 1, u2: iu2 - 1, v1: -36, v2: -5, z: 173.8, h: 38, add: sAdd }, 2, clothCols, 6);
      sAdd(iu1 + 3, iu1 + (iu2 - iu1) / 2 - 2, -34, -6, 216.8, 240, C.box);
      sAdd(iu1 + (iu2 - iu1) / 2 + 2, iu2 - 3, -34, -6, 216.8, 236, mat('#7a5a43', { roughness: 0.6 }));
      hingeDoor({ n, f, u1, u2, z0: 130, z1: 260, hinge: c === 2 ? 'u2' : 'u1', front: C.walnut });
    });
    block([754, 857, 963, 897]);
  }

  // --- end of the closet (east wall), 87 x 40: 4 drawers + open shelves for bags
  {
    const n = [-1, 0], f = 923;
    shell(n, f, 770, 857, 40, 4, 95, C.walnut);
    quiet(b(923, 770, 963, 857, 0, 4, C.black));
    const shoes = (a) => {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
        const u = a.u1 + 4 + i * ((a.u2 - a.u1 - 8) / 3), v = a.v1 + 2 + j * ((a.v2 - a.v1) / 2);
        const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#8e3b36', '#e8e2d6']);
        a.add(u, u + 9, v, v + 15, a.z, a.z + 8, m);
        a.add(u + 11, u + 20, v, v + 15, a.z, a.z + 8, m);
      }
    };
    const endFills = [(a) => folded(a, 3, ['#9e3f3a', '#c7b49b', '#5b6b5a', '#e8e2d6'], 3), (a) => { grid(a, 3, 2, 9); smalls(a, 3, 2, clothCols, 8); }, shoes, shoes];
    [[72.5, 95], [50, 72.5], [27.5, 50], [5, 27.5]].forEach(([z0, z1], i) =>
      drawer({ n, f, u1: 770, u2: 857, z0, z1, depth: 38, front: C.walnut, grip: 'top', fill: endFills[i] }));
    b(923, 770, 963, 857, 95, 98, C.walnut);
    b(925, 770, 963, 772, 98, 258, C.walnut);           // side panels
    b(925, 855, 963, 857, 98, 258, C.walnut);
    for (const z of [140, 182, 220]) b(925, 772, 963, 855, z, z + 2, C.inner);
    const bagCols = ['#7a5a43', '#2d2d2d', '#c8b49a', '#8e3b36', '#a7b1a0'];
    [[100, 128], [142, 170], [184, 212], [222, 250]].forEach(([z0, z1], k) => {
      for (let y = 778; y < 848; y += 25) {
        const m = mat(bagCols[(k * 3 + y) % bagCols.length], { roughness: 0.6 });
        quiet(b(935, y, 955, y + 20, z0, z0 + (z1 - z0) * (0.6 + ((y + k) % 3) * 0.12), m));
      }
    });
    block([923, 770, 963, 857]);
  }

  // ======================= TWO-SIDED UNIT: hall coat storage | living-room TV section =======================
  // replaces the wall between the hall and the living room; spine at x 623–625, y 380–580
  {
    const Y1 = 380, Y2 = 580, TOP = H;                             // full height, up to the ceiling
    b(623, Y1, 625, Y2, 0, TOP, C.walnut);                         // spine
    b(621, Y1, 665, Y1 + 2, 0, TOP, C.walnut);                    // end panel facing the entrance
    b(593, Y1, 665, Y2, TOP - 2, TOP, C.walnut);                   // top
    block([621, Y1, 665, Y2]);

    // ---- hall side (faces +x, 40 deep, front at x 665)
    const nH = [1, 0], fH = 665, frH = frame(nH, fH);
    quiet(b(625, Y1, 665, Y2, 0, 4, C.black));                     // plinth
    b(...frH(481, 483, -40, 0), 4, TOP - 2, C.walnut);             // divider
    // coat niche y 382–481: hooks, hat shelf with LED, bench with shoe drawers
    b(...frH(382, 481, -40, -2), 182, 184, C.walnut);              // hat shelf
    quiet(b(...frH(384, 479, -6, -4), 180.5, 182, C.lightGlow));  // LED strip
    for (let k = 0; k < 5; k++) {
      const y = 392 + k * 19;
      b(625, y - 1, 630, y + 1, 168, 170, C.black);                // hook
      if (k !== 3) quiet(b(626, y - 8, 650, y + 8, 82 + (k % 2) * 12, 168, pick(['#3d3d3d', '#7a5a43', '#2f3a4a', '#b9a58c'])));  // coat
    }
    quiet(b(632, 400, 650, 420, 184, 196, mat('#c8b49a')));        // hat box
    quiet(b(632, 440, 650, 470, 184, 190, mat('#5b6b5a')));
    shell(nH, fH, 382, 481, 40, 200, TOP - 2, C.walnut);           // cabinet above the coat niche
    quiet(b(...frH(386, 430, -34, -6), 201.8, 222, C.box));
    quiet(b(...frH(434, 477, -34, -6), 201.8, 218, mat('#9aa7ad')));
    hingeDoor({ n: nH, f: fH, u1: 382, u2: 431.5, z0: 200, z1: TOP - 2, hinge: 'u1', front: C.walnut });
    hingeDoor({ n: nH, f: fH, u1: 431.5, u2: 481, z0: 200, z1: TOP - 2, hinge: 'u2', front: C.walnut });
    b(...frH(382, 481, -40, 0), 42, 45, C.walnut);                // bench
    quiet(b(...frH(384, 479, -38, -1), 45, 50, C.sage));           // cushion
    shell(nH, fH, 382, 481, 40, 4, 42, C.walnut);
    const shoe2 = (a) => {
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        const u = a.u1 + 2 + i * ((a.u2 - a.u1) / 2), v = a.v1 + 1 + j * ((a.v2 - a.v1) / 2);
        const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#e8e2d6']);
        a.add(u, u + 9, v, v + 15, a.z, a.z + 9, m);
        a.add(u + 10.5, u + 19.5, v, v + 15, a.z, a.z + 9, m);
      }
    };
    drawer({ n: nH, f: fH, u1: 382, u2: 431.5, z0: 4, z1: 42, depth: 38, front: C.walnut, fill: shoe2 });
    drawer({ n: nH, f: fH, u1: 431.5, u2: 481, z0: 4, z1: 42, depth: 38, front: C.walnut, fill: shoe2 });
    // closed cabinet y 483–580: shoe shelves (north half), vacuum + ironing board (south half)
    shell(nH, fH, 483, Y2, 40, 4, TOP - 2, C.walnut);
    b(...frH(530.6, 532.4, -38, -2), 6, TOP - 4, C.walnut);       // inner divider
    for (let k = 0; k < 6; k++) {
      const z = 8 + k * 25;
      quiet(b(...frH(485, 530.6, -36, -3), z, z + 1.5, C.inner));
      for (const u of [487, 509]) { const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#8e3b36', '#e8e2d6']); quiet(b(...frH(u, u + 9, -30, -6), z + 1.5, z + 10, m)); quiet(b(...frH(u + 10, u + 19, -30, -6), z + 1.5, z + 10, m)); }
    }
    for (const z of [165, 186, 215, 240]) quiet(b(...frH(485, 530.6, -36, -3), z, z + 1.5, C.inner));
    for (const z of [215, 240]) quiet(b(...frH(532.4, 578.2, -36, -3), z, z + 1.5, C.inner));
    quiet(b(...frH(488, 526, -32, -8), 216.5, 236, mat('#c8b49a')));
    quiet(b(...frH(536, 575, -32, -8), 216.5, 232, C.box));
    quiet(b(...frH(488, 526, -32, -8), 166.5, 180, C.box));
    for (const z of [150, 178]) quiet(b(...frH(532.4, 578.2, -36, -3), z, z + 1.5, C.inner));
    quiet(cylinder(...frH(552, 552, -20, -20).slice(0, 2), 25, 130, 3, mat('#7d4a8c', { roughness: 0.4 })));   // stick vacuum
    quiet(b(...frH(546, 560, -26, -12), 10, 25, mat('#3a3a3a')));
    quiet(b(...frH(546, 558, -36, -30), 115, 140, C.metalDark));  // wall dock
    quiet(b(...frH(565, 576, -38, -4), 6, 125, mat('#9aa7ad')));   // ironing board (folded)
    for (let k = 0; k < 4; k++) quiet(cylinder(...frH(538 + k * 10, 538 + k * 10, -18, -18).slice(0, 2), 151.5, 166 + (k % 2) * 4, 3, pick(['#e6eef0', '#9fc3d0', '#f0e2b6', '#c7d6c0'])));
    hingeDoor({ n: nH, f: fH, u1: 483, u2: 531.5, z0: 4, z1: TOP - 2, hinge: 'u1', front: C.walnut });
    hingeDoor({ n: nH, f: fH, u1: 531.5, u2: Y2, z0: 4, z1: TOP - 2, hinge: 'u2', front: C.mirror });

    // ---- living side: flat fluted walnut panel behind the sofa, cabinets above it (30 deep, from 175 cm)
    const nL = [-1, 0], fL = 593, frL = frame(nL, fL);
    b(621, Y1, 623, Y2, 0, 175, fluted(200));                      // slatted panel behind the sofa
    shell(nL, fL, 382, Y2, 30, 175, TOP - 2, C.walnut);
    b(593, Y1, 623, Y1 + 2, 175, TOP, C.walnut);
    quiet(b(...frL(384, Y2 - 2, -4, -2), 173.3, 175, C.lightGlow)); // LED under the cabinets – soft light over the sofa
    for (let i = 0; i < 4; i++) {
      const u1 = 382 + i * 49.5, u2 = u1 + 49.5;
      quiet(b(...frL(u1 + 2, u2 - 2, -28, -4), 176.8, 196, pick(['#d9cdb9', '#b9a58c', '#cfc6b8'])));
      quiet(b(...frL(u1 + 2, u2 - 2, -28, -4), 220, 236, pick(['#e9e3d8', '#cfc4b3'])));
      quiet(b(...frL(u1 + 1.8, u2 - 1.8, -28, -2), 218, 219.8, C.inner));
      hingeDoor({ n: nL, f: fL, u1, u2, z0: 175, z1: TOP - 2, hinge: i % 2 ? 'u2' : 'u1', front: C.walnut });
    }

    // open shelf over the sofa (16 deep, at 128 cm) with LED strips – light washes down the slats
    b(...frL(382, Y2, -28, -12), 127, 129, C.walnut);
    quiet(b(...frL(384, Y2 - 2, -26, -24), 125.6, 127, C.lightGlow));   // LED under the shelf, near the panel
    quiet(b(...frL(384, Y2 - 2, -16, -14), 125.6, 127, C.lightGlow));   // LED under the shelf, front edge
    for (let y = 390; y < 570; ) {                                     // books, vases, frames on the shelf
      const r = rnd();
      if (r < 0.45) { const w = 14 + rnd() * 12; for (let k = 0; k < w; k += 2.6) quiet(b(...frL(y + k, y + k + 2.2, -26, -14), 129, 146 + rnd() * 8, pick(['#8a5a4a', '#cfc6b8', '#2f3a4a', '#6f7d6b', '#efe9df', '#b48a6b']))); y += w + 8; }
      else if (r < 0.75) { quiet(cylinder(...frL(y + 6, y + 6, -20, -20).slice(0, 2), 129, 146 + rnd() * 10, 4 + rnd() * 2, pick(['#d8cbb6', '#e9e3d8', '#8f9a8a']))); y += 20; }
      else { quiet(b(...frL(y, y + 22, -27, -25), 129, 157, pick(['#efe9df', '#d9b8a8', '#3a3a3a']))); y += 30; }
    }

    const sofaA = () => {
    // ---- corner sofa with chaise: back against the bedroom wall (y 580), chaise along the unit
    //      main part 250 x 95 (x 371–621), chaise 90 wide reaching 165 from the wall (y 415–580)
    const sofa = mat('#cbbfae', { roughness: 1 }), sofaDark = mat('#b9ad9b', { roughness: 1 });
    const SW = 580;
    b(371, SW - 95, 621, SW, 4, 40, sofa);                          // main base
    b(531, SW - 165, 621, SW - 95, 4, 40, sofa);                    // chaise base
    b(386, SW - 21, 621, SW, 40, 84, sofaDark);                     // back along the wall
    b(371, SW - 95, 386, SW, 40, 62, sofa);                         // arm (window side)
    b(606, SW - 165, 621, SW - 21, 40, 62, sofa);                   // low side along the unit
    b(388, SW - 93, 459, SW - 21, 40, 50, sofa);                    // seat cushions
    b(459.5, SW - 93, 530.5, SW - 21, 40.2, 50.2, sofa);
    b(531, SW - 163, 605.5, SW - 21, 40, 50, sofa);                 // chaise cushion
    for (let k = 0; k < 3; k++) {
      const x1 = 388 + k * 72.5;
      b(x1 + 2, SW - 33, x1 + 70, SW - 19, 50, 82, sofaDark);       // back cushions
    }
    quiet(b(400, SW - 42, 438, SW - 32, 50, 82, C.sage));           // throw pillows
    quiet(b(560, SW - 42, 598, SW - 32, 50, 82, mat('#c7a98a')));
    quiet(b(545, SW - 150, 600, SW - 100, 50, 53, mat('#8e9c86', { roughness: 1 })));  // throw on the chaise
    block([371, SW - 95, 621, SW]);
    block([531, SW - 165, 621, SW - 95]);
    // rug + round walnut coffee table in front of the seats (clear of the balcony door swing)
    quiet(b(380, 385, 612, 575, 0, 1, mat('#e2d9cb', { roughness: 1 })));
    cylinder(468, 420, 34, 38, 32, C.walnut);
    cylinder(468, 420, 0, 34, 12, C.walnut);
    quiet(cylinder(458, 412, 38, 50, 5, mat('#d8cbb6')));
    quiet(b(470, 422, 492, 438, 38, 41, mat('#8a5a4a')));
    block([436, 388, 500, 452]);

    };
    const tvPole = () => {
    // ---- floor-to-ceiling pole: TV swivels on it, a few small swivelling shelves above and below
    {
      const cy = 285, poleA = 470;
      const metalBlack = mat('#1c1c1c', { roughness: 0.35, metalness: 0.5 });
      for (const x of [poleA]) {
        cylinder(x, cy, 0, H, 2.2, metalBlack);
        cylinder(x, cy, 0, 1.5, 5, metalBlack);                          // floor and ceiling fixings
        cylinder(x, cy, H - 1.5, H, 5, metalBlack);
        block([x - 4, cy - 4, x + 4, cy + 4]);
      }
      // swivelling shelves: [pole, height, angle (deg), contents]
      const shelfMat = mat('#2a2a2a', { roughness: 0.4, metalness: 0.4 });
      const shelves = [
        [poleA, 30, 200, 'books'], [poleA, 168, 160, 'vase'], [poleA, 198, 20, 'books'], [poleA, 228, 190, 'none'],
      ];
      for (const [x, z, deg, what] of shelves) {
        const g = new THREE.Group();
        g.position.set(M(x), 0, M(cy));
        g.rotation.y = (deg * Math.PI) / 180;
        group.add(g);
        const sb = (x1, y1, x2, y2, z0, z1, m) => quiet(b(x + x1, cy + y1, x + x2, cy + y2, z0, z1, m, g));
        const inner = new THREE.Group();
        inner.position.set(-M(x), 0, -M(cy));
        g.add(inner);
        const ib = (x1, y1, x2, y2, z0, z1, m) => quiet(b(x + x1, cy + y1, x + x2, cy + y2, z0, z1, m, inner));
        ib(2, -11, 34, 11, z, z + 1, shelfMat);
        if (what === 'books') for (let k = 0; k < 4; k++) ib(6, -9, 28, 9, z + 1 + k * 2.6, z + 3.4 + k * 2.6, pick(['#8a5a4a', '#cfc6b8', '#2f3a4a', '#6f7d6b', '#efe9df']));
        if (what === 'vase') { const pt = [x + 20, cy]; const v = cylinder(pt[0], pt[1], z + 1, z + 16, 3.5, pick(['#d8cbb6', '#8f9a8a', '#e9e3d8']), inner); v.castShadow = false; }
        void sb;
      }
      // TV on the first pole – click to turn it towards the dining table
      const tvPivot = new THREE.Group();
      tvPivot.position.set(M(poleA), 0, M(cy));
      group.add(tvPivot);
      const tvIn = new THREE.Group();
      tvIn.position.set(-M(poleA), 0, -M(cy));
      tvPivot.add(tvIn);
      const tv = { kind: 'tv' };
      const tb = (...a) => tag(b(...a, tvIn), tv);
      tb(poleA - 12, cy + 2, poleA + 12, cy + 5, 100, 130, metalBlack);       // swivel mount
      tb(poleA - 72, cy + 5, poleA + 72, cy + 8, 76, 159, mat('#111214', { roughness: 0.25, metalness: 0.3 }));  // 65" TV (144 x 83)
      quiet(b(poleA - 69, cy + 8, poleA + 69, cy + 8.3, 79, 156, mat('#1d2a33', { roughness: 0.15 }), tvIn));
      tag(cylinder(poleA, cy, 100, 130, 3.2, metalBlack, tvIn), tv);           // clamp on the pole
      tv.center = new THREE.Vector2(M(poleA), M(cy));
      tv.apply = () => { tvPivot.rotation.y = Math.PI * tv.frac; };
      register(tv);
    }
    };

    // ---- C: drop-down 100" screen from a ceiling cassette on the line where the pole was + short-throw projector
    const projector = () => {
      const Y = 288, X1 = 400, X2 = 618, TOP = H - 10, BOT = 72;
      b(X1 - 4, Y - 7, X2 + 3, Y + 7, TOP, H, mat('#ece9e3', { roughness: 0.8 }));        // cassette in the ceiling
      const part = { kind: 'screen' };
      const scrMat = mat('#f4f3f0', { roughness: 0.95 });
      const scr = new THREE.Mesh(new THREE.BoxGeometry(M(X2 - X1), 1, M(0.4)), scrMat);
      scr.position.set(M((X1 + X2) / 2), 0, M(Y));
      group.add(scr);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(M(X2 - X1 + 2), M(3), M(2)), mat('#1f1f1f', { roughness: 0.4, metalness: 0.4 }));
      bar.position.set(M((X1 + X2) / 2), 0, M(Y));
      group.add(bar);
      tag(scr, part); tag(bar, part);
      part.center = new THREE.Vector2(M((X1 + X2) / 2), M(Y));
      part.apply = () => {
        const bottom = TOP - (TOP - BOT) * part.frac;
        const h = Math.max(0.5, TOP - bottom);
        scr.scale.y = M(h); scr.position.y = M(bottom + h / 2);
        bar.position.y = M(bottom - 1.5);
        scr.visible = part.frac > 0.01;
      };
      register(part);
      part.frac = part.target = 1; part.apply();                       // shown lowered
      // ceiling short-throw projector above the coffee table (throw ~1.8 m for a 100" picture)
      quiet(b(513, 466, 517, 470, H - 6, H, C.black));
      b(495, 455, 535, 482, H - 16, H - 6, mat('#ecebe8', { roughness: 0.5 }));
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(M(3.5), M(3.5), M(2), 24), mat('#20262b', { roughness: 0.1 }));
      lens.rotation.x = Math.PI / 2; lens.position.set(M(515), M(H - 11), M(454)); group.add(lens);
    };

    // ---- D: sofa with its back against the hall unit, facing the west window; 55" TV on a low console under the window
    const layoutD = () => {
      const sofa = mat('#cbbfae', { roughness: 1 }), sofaDark = mat('#b9ad9b', { roughness: 1 });
      const X = 621;
      b(X - 95, 382, X, 580, 4, 40, sofa);
      b(X - 21, 397, X, 565, 40, 84, sofaDark);
      b(X - 95, 382, X, 397, 40, 62, sofa); b(X - 95, 565, X, 580, 40, 62, sofa);
      b(X - 93, 397.5, X - 21, 480.5, 40, 50, sofa); b(X - 93, 481.5, X - 21, 564.5, 40.2, 50.2, sofa);
      b(X - 33, 399, X - 19, 479, 50, 82, sofaDark); b(X - 33, 483, X - 19, 563, 50, 82, sofaDark);
      quiet(b(X - 42, 405, X - 32, 443, 50, 82, C.sage)); quiet(b(X - 42, 520, X - 32, 558, 50, 82, mat('#c7a98a')));
      block([X - 95, 382, X, 580]);
      quiet(b(395, 400, 520, 578, 0, 1, mat('#e2d9cb', { roughness: 1 })));
      cylinder(462, 485, 34, 38, 30, C.walnut); cylinder(462, 485, 0, 34, 11, C.walnut);
      quiet(cylinder(455, 478, 38, 50, 5, mat('#d8cbb6')));
      block([432, 455, 492, 515]);
      // floating console 122 x 38 under the window, 2 push drawers; TV on a small stand
      const nT = [1, 0], fT = 381, frT = frame(nT, fT);
      shell(nT, fT, 457, 579, 38, 25, 55, C.walnut);
      for (let i = 0; i < 2; i++) drawer({ n: nT, f: fT, u1: 457 + i * 61, u2: 518 + i * 61, z0: 26.8, z1: 53.2, depth: 36, front: fluted(60),
        fill: (a) => smalls(a, 3, 2, ['#2a2a2a', '#d9d4cc', '#6d7f99'], 6) });
      block([343, 457, 381, 579]);
      b(358, 500, 372, 536, 55, 57, C.black); b(363, 515, 366, 521, 57, 64, C.black);
      b(363, 457, 366, 579, 64, 134, mat('#111214', { roughness: 0.25, metalness: 0.3 }));   // 55" = 122 x 70
      quiet(b(366, 460, 366.3, 576, 67, 131, mat('#1d2a33', { roughness: 0.15 })));
    };

    // ---- E: no TV in the living room – open sitting area; Bedroom 1 becomes a den with a sofa bed and the TV
    const den = () => {
      quiet(cylinder(358, 472, 0, 150, 1.2, C.black)); quiet(cylinder(358, 472, 0, 2, 13, C.black));       // floor lamp by the sofa
      quiet(cylinder(358, 472, 140, 165, 15, C.lampShade));
      quiet(cylinder(603, 398, 0, 40, 14, mat('#c9b9a3'))); const plant = new THREE.Mesh(new THREE.SphereGeometry(M(30), 14, 10), mat('#6f8f5a', { roughness: 0.9 }));
      plant.position.set(M(603), M(80), M(398)); plant.scale.y = 1.4; group.add(plant); block([589, 384, 617, 412]);
      // Bedroom 1: sofa bed facing the east wall, back towards the wardrobe (90 cm in front of the wardrobe)
      const sb = mat('#8e9c86', { roughness: 1 }), sbD = mat('#7d8b76', { roughness: 1 });
      b(150, 125, 245, 325, 4, 42, sb);
      b(150, 140, 170, 310, 42, 85, sbD);
      b(150, 125, 245, 140, 42, 60, sb); b(150, 310, 245, 325, 42, 60, sb);
      b(170, 140.5, 243, 224.5, 42, 52, sb); b(170, 225.5, 243, 309.5, 42.2, 52.2, sb);
      b(170, 142, 184, 223, 52, 82, sbD); b(170, 227, 184, 308, 52, 82, sbD);
      quiet(b(184, 150, 194, 185, 52, 80, mat('#e2d9cb'))); quiet(b(184, 270, 194, 305, 52, 80, mat('#c7a98a')));
      block([150, 125, 245, 325]);
      quiet(b(160, 110, 340, 330, 0, 1, mat('#d6cdbf', { roughness: 1 })));
      cylinder(292, 225, 34, 38, 26, C.walnut); cylinder(292, 225, 0, 34, 10, C.walnut);
      block([266, 199, 318, 251]);
      const nT = [-1, 0], fT = 338, frT = frame(nT, fT);
      shell(nT, fT, 165, 285, 35, 25, 55, C.walnut);
      for (let i = 0; i < 2; i++) drawer({ n: nT, f: fT, u1: 165 + i * 60, u2: 225 + i * 60, z0: 26.8, z1: 53.2, depth: 33, front: fluted(59),
        fill: (a) => smalls(a, 3, 2, ['#2a2a2a', '#d9d4cc', '#6d7f99'], 6) });
      block([338, 165, 373, 285]);
      b(370, 164, 373, 286, 85, 155, mat('#111214', { roughness: 0.25, metalness: 0.3 }));
      quiet(b(369.7, 167, 370, 283, 88, 152, mat('#1d2a33', { roughness: 0.15 })));
      quiet(cylinder(140, 110, 0, 150, 1.2, C.black)); quiet(cylinder(140, 110, 140, 165, 15, C.lampShade));
    };

    mkVariant('A', () => { sofaA(); tvPole(); });
    mkVariant('C', () => { sofaA(); projector(); });
    mkVariant('D', () => { layoutD(); });
    mkVariant('E', () => { sofaA(); den(); });
    mkVariant('B', () => {
    // ---- Variant B: sofa with its back to the dining area, moved south so the whole hall opening (y 280–380)
    //      stays free; chaise along the unit; 55" TV on the bedroom wall over a floating console
    {
      const sofa = mat('#cbbfae', { roughness: 1 }), sofaDark = mat('#b9ad9b', { roughness: 1 });
      const SN = 382;
      b(440, SN, 621, SN + 92, 4, 40, sofa);                          // main base (92 deep)
      b(531, SN + 92, 621, 545, 4, 40, sofa);                         // chaise (165 from the back)
      b(455, SN, 606, SN + 20, 40, 84, sofaDark);                     // back towards the dining table
      b(440, SN, 455, SN + 92, 40, 62, sofa);                         // arm (balcony-door side)
      b(606, SN, 621, 545, 40, 62, sofa);                             // low side along the unit
      b(457, SN + 20, 530, SN + 90, 40, 50, sofa);
      b(531, SN + 20, 605, 543, 40, 50, sofa);                        // chaise cushion
      for (let k = 0; k < 2; k++) b(458 + k * 74, SN + 18, 528 + k * 74, SN + 32, 50, 82, sofaDark);
      quiet(b(462, SN + 31, 500, SN + 41, 50, 82, C.sage));
      quiet(b(560, SN + 31, 598, SN + 41, 50, 82, mat('#c7a98a')));
      quiet(b(545, 470, 600, 530, 50, 53, mat('#8e9c86', { roughness: 1 })));
      block([440, SN, 621, SN + 92]);
      block([531, SN + 92, 621, 545]);
      quiet(b(400, 440, 615, 578, 0, 1, mat('#e2d9cb', { roughness: 1 })));
      // small round walnut side table by the arm (no coffee table – keeps the floor in front of the TV free)
      cylinder(418, 500, 52, 55, 17, C.walnut);
      cylinder(418, 500, 0, 52, 2.2, C.walnut);
      cylinder(418, 500, 0, 1.5, 14, C.walnut);
      quiet(cylinder(414, 496, 55, 66, 4, mat('#d8cbb6')));
      block([401, 483, 435, 517]);
      // floating walnut TV console (150 x 35) with fluted push drawers, 55" TV on the wall above
      const nT = [0, -1], fT = 545, frT = frame(nT, fT);
      shell(nT, fT, 380, 530, 35, 25, 55, C.walnut);
      for (let i = 0; i < 3; i++) drawer({ n: nT, f: fT, u1: 380 + i * 50, u2: 430 + i * 50, z0: 26.8, z1: 53.2, depth: 33, front: fluted(49),
        fill: (a) => smalls(a, 3, 2, ['#2a2a2a', '#d9d4cc', '#6d7f99'], 6) });
      block([380, 545, 530, 580]);
      b(394, 575, 516, 578, 85, 155, mat('#111214', { roughness: 0.25, metalness: 0.3 }));    // 55" = 122 x 70
      quiet(b(397, 574.7, 513, 575, 88, 152, mat('#1d2a33', { roughness: 0.15 })));
      quiet(b(392, 552, 412, 572, 55, 68, mat('#d8cbb6')));
      quiet(cylinder(522, 562, 55, 75, 4, mat('#8f9a8a')));
    }
    });

  }

  // ======================= KITCHEN (U-shape) + DINING =======================
  function flap({ n, f, u1, u2, z0, z1, front, mode = 'up' }) {
    const fr = frame(n, f);
    const part = { kind: 'flap' };
    const zp = mode === 'up' ? z1 - 0.2 : z0 + 0.2;
    const pt = fr((u1 + u2) / 2, (u1 + u2) / 2, -1, -1);
    const pivot = new THREE.Group();
    pivot.position.set(M(pt[0]), M(zp), M(pt[1]));
    group.add(pivot);
    const inner = new THREE.Group();
    inner.position.set(-M(pt[0]), -M(zp), -M(pt[1]));
    pivot.add(inner);
    tag(b(...fr(u1 + 0.2, u2 - 0.2, -2, 0), z0 + 0.2, z1 - 0.2, front, inner), part);
    const ang = mode === 'up' ? 1.75 : 1.45, sg = mode === 'up' ? 1 : -1;
    part.center = centerOf(n, f, u1, u2);
    part.apply = () => { pivot.rotation.x = -n[1] * ang * sg * part.frac; pivot.rotation.z = n[0] * ang * sg * part.frac; };
    return register(part);
  }
  const zellige = (rx, ry) => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'); g.fillStyle = '#c9cfc2'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const l = 62 + rnd() * 10; g.fillStyle = `hsl(${95 + rnd() * 20}, ${14 + rnd() * 10}%, ${l}%)`;
      g.fillRect(i * 64 + 2, j * 64 + 2, 60, 60);
      g.fillStyle = `rgba(255,255,255,${0.08 + rnd() * 0.1})`; g.fillRect(i * 64 + 6, j * 64 + 6, 30, 20);
    }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: t, roughness: 0.25 });
  };
  const stone = mat('#e7e0d4', { roughness: 0.35 });
  const upperMat = mat('#bba996', { roughness: 0.6 });               // warm greige ("cashmere") uppers – light, not white
  const blackGlass = mat('#141516', { roughness: 0.1, metalness: 0.3 });
  const appliance = mat('#d9d9d6', { roughness: 0.6 });
  const steel = C.metal;
  const plates = (x, y, z0, z1, r) => { for (let z = z0; z < z1; z += 1.6) quiet(cylinder(x, y, z, z + 1, r, mat('#efebe4', { roughness: 0.3 }))); };
  const kitchen = (kind) => {                                       // 'U' (K1–K3) or 'L' (K4)
    // ===== U-shaped kitchen =====
    // north leg (under the window, faces +y, front y 60): slim dishwasher 45 | sink 45
    // corner x 720–780 y 0–60: blind, worktop above (coffee machine)
    // east run (faces -x, front x 720): hob y 60–120 with drawers below | narrow pull-out y 120–148
    // east run: corner | hob + oven below | spice pull-out | drawers; microwave in the upper cabinet; tall wall (front y 208): fridge | pantry 30
    const nN = [0, 1], fN = 60, frN = frame(nN, fN);
    const nE = [-1, 0], fE = 720, frE = frame(nE, fE);
    const nS = [0, -1], fS = 208, frS = frame(nS, fS);

    if (kind === 'U') {
    // ---------- north leg
    quiet(b(630, 0, 720, 58, 0, 10, C.black));
    shell(nN, fN, 630, 720, 60, 10, 86, C.walnut);
    b(...frN(674.1, 675.9, -60, -2), 10, 86, C.walnut);
    quiet(b(...frN(632, 673, -58, -4), 12, 84, appliance));             // 45 cm dishwasher
    for (const z of [20, 52]) {
      quiet(b(...frN(633, 672, -56, -6), z, z + 1.2, steel));
      for (let u = 636; u < 670; u += 4) quiet(b(...frN(u, u + 0.6, -50, -10), z + 1.2, z + 22 - (z > 30 ? 10 : 0), mat('#efebe4', { roughness: 0.3 })));
    }
    flap({ n: nN, f: fN, u1: 630, u2: 675, z0: 10, z1: 86, front: C.walnut, mode: 'down' });
    b(...frN(675.2, 719.8, -2, 0), 70, 85.8, C.walnut);               // false front under the sink
    drawer({ n: nN, f: fN, u1: 675, u2: 720, z0: 10, z1: 70, depth: 55, front: C.walnut, grip: 'top', fill: (a) => {
      const w = (a.u2 - a.u1) / 2;
      ['#3a3a3a', '#5b6b5a'].forEach((c, i) => a.add(a.u1 + i * w + 1, a.u1 + (i + 1) * w - 1, a.v1 + 2, a.v2 - 4, a.z, a.z + 38, mat(c, { roughness: 0.6 }))); } });
    // corner (blind)
    b(722, 0, 780, 58, 10, 86, C.walnut);
    quiet(b(722, 0, 780, 58, 0, 10, C.black));
    block([630, 0, 780, 62]);

    // ---------- east run y 60–208: hob with oven below | narrow pull-out | drawer stack (extra 60 cm worktop above)
    quiet(b(722, 60, 780, 208, 0, 10, C.black));
    shell(nE, fE, 60, 208, 60, 10, 86, C.walnut);
    for (const u of [120, 148]) b(...frE(u - 0.9, u + 0.9, -60, -2), 10, 86, C.walnut);
    // built-in oven under the hob (front drops down) + shallow tray drawer
    quiet(b(...frE(62, 118, -56, -4), 28, 84, mat('#2a2a2a')));
    quiet(b(...frE(64, 116, -54, -6), 45, 46, steel));
    flap({ n: nE, f: fE, u1: 60, u2: 120, z0: 26, z1: 86, front: blackGlass, mode: 'down' });
    drawer({ n: nE, f: fE, u1: 60, u2: 120, z0: 10, z1: 26, depth: 56, front: C.walnut, grip: 'top', fill: (a) => {
      for (let k = 0; k < 3; k++) a.add(a.u1 + 2, a.u2 - 2, a.v1 + 2, a.v2 - 2, a.z + k * 2.2, a.z + k * 2.2 + 1, steel); } });
    // narrow pull-out next to the hob: oils and spices
    drawer({ n: nE, f: fE, u1: 120, u2: 148, z0: 10, z1: 86, depth: 56, front: C.walnut, grip: 'top', fill: (a) => {
      for (const zz of [0, 24, 48]) {
        a.add(a.u1, a.u2, a.v1, a.v2, a.z + zz, a.z + zz + 0.8, C.inner);
        for (let v = a.v1 + 3; v < a.v2 - 3; v += 8) a.cyl((a.u1 + a.u2) / 2, v, a.z + zz + 0.8, a.z + zz + 14 + rnd() * 6, 2.8, pick(['#c9a65a', '#5b6b5a', '#8a5a4a', '#e9d6b8']));
      } } });
    // drawer stack y 148–208: cutlery, utensils, pots
    drawer({ n: nE, f: fE, u1: 148, u2: 208, z0: 70, z1: 86, depth: 58, front: C.walnut, grip: 'top', fill: (a) => {
      grid(a, 5, 1, 5); for (let i = 0; i < 5; i++) for (let k = 0; k < 4; k++) a.add(a.u1 + 3 + i * ((a.u2 - a.u1) / 5), a.u1 + 6 + i * ((a.u2 - a.u1) / 5), a.v1 + 4 + k * 3, a.v1 + 5 + k * 3, a.z, a.z + 1, steel); } });
    drawer({ n: nE, f: fE, u1: 148, u2: 208, z0: 42, z1: 70, depth: 58, front: C.walnut, grip: 'top', fill: (a) => smalls(a, 4, 3, ['#3a3a3a', '#c9a77c', '#8f9a8a', '#d9d4cc'], 10) });
    drawer({ n: nE, f: fE, u1: 148, u2: 208, z0: 10, z1: 42, depth: 58, front: C.walnut, grip: 'top', fill: (a) => {
      for (const [pu, pv, r] of [[0.28, 0.3, 11], [0.72, 0.3, 10], [0.3, 0.75, 9], [0.72, 0.74, 12]]) a.cyl(a.u1 + pu * (a.u2 - a.u1), a.v1 + pv * (a.v2 - a.v1), a.z, a.z + 14 + r * 0.4, r, pick(['#2a2a2a', '#7a4a3a', '#5b6b5a', '#c8c8c4'])); } });
    block([720, 60, 780, 208]);

    // ---------- worktops, sink, hob
    b(630, 0, 780, 62, 86, 90, stone);
    b(718, 62, 780, 208, 86, 90, stone);
    quiet(b(680, 12, 716, 50, 89.6, 90.2, mat('#3b3d3f', { roughness: 0.4 })));   // sink under the window
    cylinder(712, 6, 90, 112, 1.4, steel);                                         // low faucet (window opens inward)
    quiet(b(704, 5, 713, 7, 110, 112, steel));
    quiet(b(724, 64, 776, 116, 90, 90.5, blackGlass));                            // induction hob, 60 cm worktop on its left

    } else {
      // ---------- L: no leg under the window; east run y 0–208: sink 60 | dishwasher 45 | drawers 43 | hob + oven 60
      quiet(b(722, 0, 780, 208, 0, 10, C.black));
      shell(nE, fE, 0, 208, 60, 10, 86, C.walnut);
      for (const u of [60, 105, 148]) b(...frE(u - 0.9, u + 0.9, -60, -2), 10, 86, C.walnut);
      b(...frE(0.2, 59.8, -2, 0), 70, 85.8, C.walnut);                 // false front under the sink
      drawer({ n: nE, f: fE, u1: 0, u2: 60, z0: 10, z1: 70, depth: 55, front: C.walnut, grip: 'top', fill: (a) => {
        const w = (a.u2 - a.u1) / 3;
        ['#3a3a3a', '#5b6b5a', '#c7a98a'].forEach((c, i) => a.add(a.u1 + i * w + 1, a.u1 + (i + 1) * w - 1, a.v1 + 2, a.v2 - 4, a.z, a.z + 38, mat(c, { roughness: 0.6 }))); } });
      quiet(b(...frE(62, 103, -58, -4), 12, 84, appliance));           // 45 cm dishwasher
      for (const z of [20, 52]) {
        quiet(b(...frE(63, 102, -56, -6), z, z + 1.2, steel));
        for (let u = 66; u < 100; u += 4) quiet(b(...frE(u, u + 0.6, -50, -10), z + 1.2, z + 22 - (z > 30 ? 10 : 0), mat('#efebe4', { roughness: 0.3 })));
      }
      flap({ n: nE, f: fE, u1: 60, u2: 105, z0: 10, z1: 86, front: C.walnut, mode: 'down' });
      drawer({ n: nE, f: fE, u1: 105, u2: 148, z0: 70, z1: 86, depth: 58, front: C.walnut, grip: 'top', fill: (a) => {
        grid(a, 4, 1, 5); for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) a.add(a.u1 + 2 + i * ((a.u2 - a.u1) / 4), a.u1 + 5 + i * ((a.u2 - a.u1) / 4), a.v1 + 4 + k * 3, a.v1 + 5 + k * 3, a.z, a.z + 1, steel); } });
      drawer({ n: nE, f: fE, u1: 105, u2: 148, z0: 42, z1: 70, depth: 58, front: C.walnut, grip: 'top', fill: (a) => smalls(a, 3, 3, ['#3a3a3a', '#c9a77c', '#8f9a8a', '#d9d4cc'], 10) });
      drawer({ n: nE, f: fE, u1: 105, u2: 148, z0: 10, z1: 42, depth: 58, front: C.walnut, grip: 'top', fill: (a) => {
        for (const [pu, pv, r] of [[0.5, 0.3, 11], [0.5, 0.74, 12]]) a.cyl(a.u1 + pu * (a.u2 - a.u1), a.v1 + pv * (a.v2 - a.v1), a.z, a.z + 16, r, pick(['#2a2a2a', '#7a4a3a', '#5b6b5a'])); } });
      quiet(b(...frE(150, 206, -56, -4), 28, 84, mat('#2a2a2a')));      // oven under the hob
      quiet(b(...frE(152, 204, -54, -6), 45, 46, steel));
      flap({ n: nE, f: fE, u1: 148, u2: 208, z0: 26, z1: 86, front: blackGlass, mode: 'down' });
      drawer({ n: nE, f: fE, u1: 148, u2: 208, z0: 10, z1: 26, depth: 56, front: C.walnut, grip: 'top', fill: (a) => {
        for (let k = 0; k < 3; k++) a.add(a.u1 + 2, a.u2 - 2, a.v1 + 2, a.v2 - 2, a.z + k * 2.2, a.z + k * 2.2 + 1, steel); } });
      block([720, 0, 780, 208]);
      b(718, 0, 780, 208, 86, 90, stone);
      quiet(b(728, 12, 772, 50, 89.6, 90.2, mat('#3b3d3f', { roughness: 0.4 })));     // sink by the window corner
      cylinder(776, 31, 90, 118, 1.6, steel); quiet(b(762, 30, 776, 32, 116, 119, steel));
      quiet(b(724, 152, 776, 204, 90, 90.5, blackGlass));                            // hob, corner worktop on its right
    }
    // ---------- tall wall
    quiet(b(630, 210, 780, 268, 0, 10, C.black));
    // fridge x 630–690
    shell(nS, fS, 630, 690, 60, 0, 263, C.walnut);
    b(628, 208, 630, 268, 0, 263, fluted(60));                         // fluted side towards the dining table
    b(630, 268, 638, 270, 0, 263, fluted(8));
    const fridgeIn = mat('#e4e6e6', { roughness: 0.5 });
    quiet(b(...frS(632, 688, -58, -6), 6, 180, fridgeIn));
    for (const z of [40, 75, 110, 145]) {
      quiet(b(...frS(634, 686, -56, -8), z, z + 0.8, mat('#cfe0e6', { roughness: 0.1, transparent: true, opacity: 0.6 })));
      for (let u = 638; u < 680; u += 10 + rnd() * 6) quiet(b(...frS(u, u + 6 + rnd() * 3, -40, -16), z + 0.8, z + 8 + rnd() * 12, pick(['#c94f3d', '#e9d6b8', '#5b8a4a', '#f0c84a', '#efebe4', '#8a5a4a'])));
    }
    quiet(b(...frS(636, 684, -50, -10), 8, 36, mat('#cfd6da', { roughness: 0.2, transparent: true, opacity: 0.7 })));
    hingeDoor({ n: nS, f: fS, u1: 630, u2: 690, z0: 4, z1: 182, hinge: 'u1', front: C.walnut });
    b(...frS(632, 688, -58, -2), 182, 183.8, C.walnut);
    quiet(b(...frS(636, 684, -50, -10), 184, 205, C.box));
    hingeDoor({ n: nS, f: fS, u1: 630, u2: 690, z0: 182, z1: 263, hinge: 'u1', front: C.walnut });

    // pantry pull-out next to the fridge x 690–720 (30 cm, full height): jars, cans, pasta
    shell(nS, fS, 690, 720, 60, 10, 263, C.walnut);
    drawer({ n: nS, f: fS, u1: 690, u2: 720, z0: 10, z1: 255, depth: 56, front: C.walnut, grip: 'top', fill: (a) => {
      for (let zz = 0; zz < 225; zz += 32) {
        a.add(a.u1, a.u2, a.v1, a.v2, a.z + zz, a.z + zz + 0.8, C.inner);
        for (let v = a.v1 + 4; v < a.v2 - 4; v += 9) a.cyl((a.u1 + a.u2) / 2, v, a.z + zz + 0.8, a.z + zz + 12 + rnd() * 10, 3.5, pick(['#e9d6b8', '#c9a65a', '#efebe4', '#8a5a4a', '#b84a2a', '#cfe0e6']));
      } } });
    b(720, 208, 780, 268, 10, 86, C.walnut);                           // blind corner under the worktop
    b(718, 208, 780, 268, 86, 90, stone);
    block([628, 208, 780, 270]);

    // ---------- upper cabinets over the east run, two rows to the ceiling, lift-up fronts; microwave + hood depend on the layout
    {
      const micro = kind === 'U' ? [148, 208] : [60, 120], hood = kind === 'U' ? [60, 120] : [148, 208];
      const nU = [-1, 0], fU = 745, frU = frame(nU, fU);
      shell(nU, fU, 0, 208, 35, 145, 263, upperMat);
      b(...frU(0, 208, -35, -2), 204, 205.8, upperMat);
      for (const u of [60, 120, 148]) b(...frU(u - 0.9, u + 0.9, -35, -2), 145, 263, upperMat);
      b(745, 208, 780, 268, 145, 263, upperMat);                       // closed corner upper
      quiet(b(...frU(micro[0] + 2, micro[1] - 2, -34, -4), 147, 184, mat('#2a2a2a')));
      quiet(cylinder(...frU((micro[0] + micro[1]) / 2, (micro[0] + micro[1]) / 2, -18, -18).slice(0, 2), 147, 148, 12, mat('#e9e9e6', { roughness: 0.2 })));
      const uAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...frU(a1, a2, c1, c2), za, zb, m));
      for (let u = 4; u < 56; u += 8) for (const vv of [-28, -16, -6]) quiet(cylinder(...frU(u + 3, u + 3, vv, vv).slice(0, 2), 146.8, 158, 3, mat('#dfe8ea', { roughness: 0.05, transparent: true, opacity: 0.6 })));
      for (let u = 4; u < 54; u += 12) plates(...frU(u + 6, u + 6, -18, -18).slice(0, 2), 165, 175, 9);
      quiet(b(747, hood[0] + 2, 778, hood[1] - 2, 148, 150, mat('#2a2a2a', { roughness: 0.4, metalness: 0.4 })));
      quiet(b(...frU(hood[0] + 2, hood[1] - 2, -33, -4), 151.8, 172, steel));
      for (let u = 123; u < 146; u += 6) for (const vv of [-28, -18, -8]) quiet(cylinder(...frU(u + 2, u + 2, vv, vv).slice(0, 2), 146.8, 156, 2.3, pick(['#c9a65a', '#8a5a4a', '#b84a2a', '#5b6b5a'])));
      for (let u = 4; u < 204; u += 30) uAdd(u, Math.min(u + 26, 206), -32, -6, 205.8, 226, pick([C.box, mat('#c8b49a'), mat('#9aa7ad')]));
      for (const [u1, u2] of [[0, 60], [60, 120], [120, 148], [148, 208]]) {
        if (u1 === micro[0]) {
          hingeDoor({ n: nU, f: fU, u1, u2, z0: 145, z1: 186, hinge: 'u2', front: blackGlass });
          b(...frU(u1 + 0.4, u2 - 0.4, -2, 0), 186.2, 204.3, upperMat);
        } else flap({ n: nU, f: fU, u1, u2, z0: 145, z1: 204.5, front: upperMat, mode: 'up' });
        flap({ n: nU, f: fU, u1, u2, z0: 205, z1: 263, front: upperMat, mode: 'up' });
      }
      quiet(b(...frU(2, 206, -4, -2), 143.5, 145, C.lightGlow));
    }
    // backsplash – sage zellige
    quiet(b(779, 0, 780, 268, 90, 145, zellige(27, 5.5)));
    if (kind === 'U') quiet(b(630, 0, 720, 1, 90, 104, zellige(9, 1.4)));
    // open walnut shelf above the window with plants
    b(632, 0, 718, 22, 236, 238.5, C.walnut);
    for (const [x, r, h] of [[642, 6, 14], [668, 4, 10], [700, 7, 16]]) {
      quiet(cylinder(x, 11, 238.5, 238.5 + h * 0.6, r, pick([mat('#c9b9a3'), mat('#e9e3d8'), mat('#8a5a4a')])));
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(M(r + 3), 12, 8), mat('#6f8f5a', { roughness: 0.9 }));
      leaf.position.set(M(x), M(238.5 + h * 0.6 + r), M(11));
      group.add(leaf);
    }
  };

  const diningOval = () => {
    const TX = 490, TY = 165, RX = 70, RY = 45;                         // table 140 x 90
    const oval = (rx, ry, z0, z1, m) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, M(z1 - z0), 64), m);
      mesh.scale.set(M(rx), 1, M(ry));
      mesh.position.set(M(TX), M((z0 + z1) / 2), M(TY));
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    };
    oval(RX, RY, 72, 75, C.walnut);                                     // top
    oval(RX - 1.5, RY - 1.5, 70.5, 72, C.walnut);
    oval(22, 12, 0, 3, C.walnut);                                       // oval foot
    oval(10, 6, 3, 70.5, C.walnut);                                     // pedestal
    block([TX - RX + 8, TY - RY + 6, TX + RX - 8, TY + RY - 6]);
    // chairs: round seat, curved back shell, slim walnut legs
    const seatMat = mat('#d8cdbd', { roughness: 1 });                   // cream boucle
    const chair = (cx, cy, backSide) => {
      cylinder(cx, cy, 44, 50, 22, seatMat);
      const back = new THREE.Mesh(new THREE.CylinderGeometry(M(22), M(22), M(30), 32, 1, true,
        backSide < 0 ? Math.PI / 2 + 0.3 : -Math.PI / 2 + 0.3, Math.PI - 0.6), seatMat);
      back.material = seatMat.clone(); back.material.side = THREE.DoubleSide;
      back.position.set(M(cx), M(65), M(cy));
      back.castShadow = true;
      group.add(back);
      for (const [dx, dy] of [[-14, -14], [14, -14], [-14, 14], [14, 14]]) cylinder(cx + dx, cy + dy, 0, 44, 1.3, C.walnut);
      block([cx - 22, cy - 22, cx + 22, cy + 22]);
    };
    chair(458, 96, -1); chair(522, 96, -1);                             // window side (backs to the balcony door)
    chair(458, 234, 1); chair(522, 234, 1);                             // living side
    // two globe pendants over the table
    for (const x of [462, 518]) {
      quiet(cylinder(x, TY, 175, H, 0.3, C.black));
      const globe = new THREE.Mesh(new THREE.SphereGeometry(M(13), 24, 16), C.lampShade);
      globe.position.set(M(x), M(165), M(TY));
      group.add(globe);
    }
    quiet(cylinder(478, 160, 75, 90, 4, mat('#d8cbb6')));
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(M(11), 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#8a5a4a', { roughness: 0.5 }));
    bowl.position.set(M(505), M(86), M(170));
    group.add(bowl);
    };

  // ---------- K2: coffee / breakfast station on the north wall between the kitchen and the big balcony door (60 x 40)
  const coffee = () => {
    const n = [0, 1], f = 40, fr = frame(n, f);
    quiet(b(587, 0, 630, 38, 0, 10, C.black));
    shell(n, f, 585, 630, 40, 10, 86, C.walnut);
    drawer({ n, f, u1: 585, u2: 630, z0: 62, z1: 86, depth: 38, front: C.walnut, grip: 'top', fill: (a) => {
      grid(a, 3, 2, 8); for (let i = 0; i < 9; i++) a.cyl(a.u1 + 5 + (i % 3) * 12, a.v1 + 8 + ((i / 3) | 0) * 16, a.z, a.z + 2.5, 2, pick(['#b84a2a', '#2a2a2a', '#c9a65a', '#5b6b5a'])); } });
    drawer({ n, f, u1: 585, u2: 630, z0: 10, z1: 62, depth: 38, front: C.walnut, grip: 'top', fill: (a) => {
      for (const [pu, pv] of [[0.25, 0.3], [0.7, 0.3], [0.3, 0.75], [0.72, 0.72]]) a.cyl(a.u1 + pu * (a.u2 - a.u1), a.v1 + pv * (a.v2 - a.v1), a.z, a.z + 18, 6, pick(['#e9d6b8', '#c9a65a', '#efebe4', '#8a5a4a'])); } });
    b(583, 0, 630, 42, 86, 90, stone);
    quiet(b(593, 4, 623, 36, 90, 128, mat('#2a2a2a', { roughness: 0.4, metalness: 0.4 })));   // coffee machine
    quiet(b(598, 35, 618, 37, 100, 112, steel));
    for (const z of [132, 165]) {
      b(585, 0, 630, 24, z, z + 2.5, C.walnut);                          // open shelves with cups
      for (let x = 590; x < 627; x += 9) quiet(cylinder(x, 12, z + 2.5, z + 11, 3.5, pick([mat('#efebe4'), mat('#c58b7a'), mat('#5b6b5a'), mat('#e3c9a8')])));
    }
    const nU2 = [0, 1], fU2 = 30;
    shell(nU2, fU2, 585, 630, 30, 205, 263, upperMat);
    flap({ n: nU2, f: fU2, u1: 585, u2: 630, z0: 205, z1: 263, front: upperMat, mode: 'up' });
    block([583, 0, 630, 42]);
  };

  // ---------- K3: kitchen island 130 x 70 instead of the dining table – drawers towards the kitchen, 3 stools on the dining side
  const island = () => {
    const n = [1, 0], f = 560, fr = frame(n, f);
    quiet(b(517, 102, 558, 228, 0, 10, C.black));
    shell(n, f, 100, 230, 45, 10, 88, C.walnut);
    for (const u of [143.3, 186.7]) b(...fr(u - 0.9, u + 0.9, -45, -2), 10, 88, C.walnut);
    const fills = [(a) => { for (let k = 0; k < 2; k++) a.cyl((a.u1 + a.u2) / 2, a.v1 + 10 + k * 18, a.z, a.z + 9, 9, mat('#efebe4', { roughness: 0.3 })); },
      (a) => folded(a, 2, linenCols, 3), (a) => smalls(a, 3, 2, ['#3a3a3a', '#c9a77c', '#8f9a8a'], 10)];
    [[100, 143.3], [143.3, 186.7], [186.7, 230]].forEach(([u1, u2], i) => {
      drawer({ n, f, u1, u2, z0: 49, z1: 88, depth: 43, front: C.walnut, grip: 'top', fill: fills[i] });
      drawer({ n, f, u1, u2, z0: 10, z1: 49, depth: 43, front: C.walnut, grip: 'top', fill: fills[(i + 1) % 3] });
    });
    b(513, 100, 515, 230, 10, 88, fluted(130));                        // fluted back towards the stools
    b(488, 97, 562, 233, 88, 92, stone);                               // top with 25 cm overhang
    const seat = mat('#d8cdbd', { roughness: 1 });
    for (const y of [125, 165, 205]) {
      cylinder(478, y, 63, 67, 17, seat);
      for (const [dx, dy] of [[-11, -11], [11, -11], [-11, 11], [11, 11]]) cylinder(478 + dx, y + dy, 0, 63, 1.2, C.walnut);
      quiet(b(466, y - 12, 490, y + 12, 25, 26.5, C.walnut));
      block([461, y - 17, 495, y + 17]);
    }
    block([488, 97, 562, 233]);
    for (const y of [130, 200]) {
      quiet(cylinder(525, y, 175, H, 0.3, C.black));
      const globe = new THREE.Mesh(new THREE.SphereGeometry(M(13), 24, 16), C.lampShade);
      globe.position.set(M(525), M(165), M(y)); group.add(globe);
    }
    quiet(cylinder(530, 150, 92, 104, 4, mat('#d8cbb6')));
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(M(11), 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat('#8a5a4a', { roughness: 0.5 }));
    bowl.position.set(M(525), M(103), M(190)); group.add(bowl);
  };

  mkVariant('k1', () => { kitchen('U'); diningOval(); });
  mkVariant('k2', () => { kitchen('U'); coffee(); diningOval(); });
  mkVariant('k3', () => { kitchen('U'); island(); });
  mkVariant('k4', () => { kitchen('L'); diningOval(); });

  // ======================= HALL: capsule mirror with halo light + floating key console =======================
  {
    const capsule = (w, h) => {                                        // stadium shape, rounded on the short sides
      const r = Math.min(w, h) / 2, x = w / 2 - r, y = h / 2 - r, sh = new THREE.Shape();
      sh.moveTo(-x, -h / 2);
      sh.lineTo(x, -h / 2);
      sh.absarc(x, -y, r, -Math.PI / 2, 0, false);
      sh.lineTo(w / 2, y);
      sh.absarc(x, y, r, 0, Math.PI / 2, false);
      sh.lineTo(-x, h / 2);
      sh.absarc(-x, y, r, Math.PI / 2, Math.PI, false);
      sh.lineTo(-w / 2, -y);
      sh.absarc(-x, -y, r, Math.PI, Math.PI * 1.5, false);
      return sh;
    };
    const MX = 715, MZ = 112;                                          // centre of the mirror (plan x, height)
    const halo = new THREE.Mesh(new THREE.ShapeGeometry(capsule(M(78), M(188)), 48),
      new THREE.MeshStandardMaterial({ color: '#fff3dc', emissive: '#ffe2b0', emissiveIntensity: 1.3 }));
    halo.position.set(M(MX), M(MZ), M(280.6));
    group.add(halo);
    const mirror = new THREE.Mesh(new THREE.ExtrudeGeometry(capsule(M(70), M(180)), { depth: M(1.2), bevelEnabled: false, curveSegments: 48 }),
      mat('#c9d5da', { roughness: 0.05, metalness: 0.2 }));
    mirror.position.set(M(MX), M(MZ), M(281.2));
    mirror.castShadow = false;
    group.add(mirror);
    // floating capsule-shaped walnut console in front of the mirror (60 x 18 x 12) with a push drawer
    const con = new THREE.Mesh(new THREE.ExtrudeGeometry(capsule(M(60), M(18)), { depth: M(12), bevelEnabled: true, bevelSize: M(0.6), bevelThickness: M(0.6), bevelSegments: 2, curveSegments: 32 }), C.walnut);
    con.rotation.x = Math.PI / 2;
    con.position.set(M(MX), M(100), M(291));
    con.castShadow = true;
    group.add(con);
    const keyDrawer = drawer({ n: [0, 1], f: 300.4, u1: MX - 18, u2: MX + 18, z0: 89.5, z1: 99, depth: 15, front: fluted(36), fill: (a) => {
      a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.5, C.velvet);
      a.add(a.u1 + 2, a.u1 + 14, a.v1 + 2, a.v2 - 2, a.z + 0.5, a.z + 2.5, mat('#3b2a20'));          // wallet
      a.add(a.u1 + 16, a.u1 + 24, a.v1 + 3, a.v2 - 3, a.z + 0.5, a.z + 3, mat('#2a2a2a'));          // sunglasses case
      a.add(a.u1 + 27, a.u2 - 3, a.v1 + 3, a.v2 - 4, a.z + 0.5, a.z + 1, mat('#e9e3d8'));          // letters
    } });
    tag(con, keyDrawer);                                               // the whole console body opens the hidden push drawer
    // on top: ceramic key tray, small vase
    quiet(cylinder(MX - 14, 291, 100.6, 102, 7, mat('#d8cbb6', { roughness: 0.5 })));
    quiet(b(MX - 17, 289, MX - 10, 292, 102, 102.6, C.metal));
    quiet(cylinder(MX + 18, 291, 100.6, 114, 3, mat('#8f9a8a', { roughness: 0.4 })));
    block([MX - 31, 280, MX + 31, 301]);
  }

  // ======================= BATHROOM =======================
  // upper part x 762–900 / y 433–606, lower part x 762–963 / y 606–698; door 70 cm on the west wall (y 438–508)
  {
    const tileTex = (() => {
      const c = document.createElement('canvas'); c.width = 256; c.height = 512;
      const g = c.getContext('2d'); g.fillStyle = '#b9b1a6'; g.fillRect(0, 0, 256, 512);
      g.fillStyle = '#d9d1c5'; g.fillRect(1.5, 1.5, 253, 509);
      for (let k = 0; k < 60; k++) { g.fillStyle = `rgba(150,135,120,${0.04 + rnd() * 0.05})`; g.beginPath(); g.ellipse(rnd() * 256, rnd() * 512, 10 + rnd() * 40, 3 + rnd() * 8, rnd() * 3, 0, 7); g.fill(); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; return t;
    })();
    const tileMat = (w, h) => { const t = tileTex.clone(); t.needsUpdate = true; t.repeat.set(w / 60, h / 120); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.35 }); };
    const clad = (x1, y1, x2, y2, z0 = 0, z1 = H) => quiet(b(x1, y1, x2, y2, z0, z1, tileMat(Math.max(x2 - x1, y2 - y1), z1 - z0)));
    // stone-look 60 x 120 tiles to the ceiling
    clad(762, 433, 835, 433.6);
    clad(762, 433, 762.6, 438);
    clad(762, 697.4, 963, 698);
    clad(899.4, 546, 900, 606);
    clad(900, 606, 963, 606.6);
    clad(962.4, 606, 963, 698);
    const white = mat('#f4f3f0', { roughness: 0.25 });
    const showerGlass = new THREE.MeshPhysicalMaterial({ color: '#dfeef2', transparent: true, opacity: 0.22, roughness: 0.05, depthWrite: false, side: THREE.DoubleSide });
    const blackMetal = mat('#1f1f1f', { roughness: 0.4, metalness: 0.5 });

    mkVariant('bA', () => {
      clad(762, 508, 762.6, 698); clad(762, 438, 762.6, 508, 200, H);
      // ---------- washer + dryer tower on the east wall (front x 835, 65 deep), detergents in the cabinet above
      const nA = [-1, 0], fA = 835, frA = frame(nA, fA);
      shell(nA, fA, 433, 498, 65, 4, 263, C.walnut);
      quiet(b(835, 433, 900, 498, 0, 4, C.black));
      const appl = mat('#ecebe8', { roughness: 0.5 });
      const porthole = (z) => {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(M(16), M(16), M(1.5), 40), mat('#9aa0a6', { metalness: 0.6, roughness: 0.3 }));
        ring.rotation.z = Math.PI / 2; ring.position.set(M(839.2), M(z), M(465.5)); group.add(ring);
        const g2 = new THREE.Mesh(new THREE.CylinderGeometry(M(12.5), M(12.5), M(1.6), 40), mat('#2b3338', { roughness: 0.1 }));
        g2.rotation.z = Math.PI / 2; g2.position.set(M(838.9), M(z), M(465.5)); group.add(g2);
      };
      quiet(b(840, 435.5, 898, 495.5, 4, 89, appl)); porthole(48);
      quiet(b(...frA(436, 495, -63, -3), 89, 90.5, C.inner));          // pull-out shelf between the machines
      quiet(b(840, 435.5, 898, 495.5, 90.5, 175, appl)); porthole(134);
      quiet(b(840.5, 437, 842, 494, 165, 172, mat('#3a3a3a'))); quiet(b(840.5, 437, 842, 494, 79, 86, mat('#3a3a3a')));
      b(...frA(435, 496, -63, -2), 177, 178.8, C.walnut);
      for (let k = 0; k < 5; k++) quiet(cylinder(...frA(442 + k * 11, 442 + k * 11, -22, -22).slice(0, 2), 178.8, 198 + (k % 2) * 5, 3.8, pick(['#e6eef0', '#9fc3d0', '#f0e2b6', '#c7d6c0', '#f2f2f2'])));
      for (let k = 0; k < 4; k++) quiet(b(...frA(440 + k * 13, 450 + k * 13, -50, -34), 178.8, 192, pick(['#f2f2f2', '#e8d8c4', '#cfe0e6'])));
      b(...frA(437, 494, -63, -3), 215, 216.6, C.inner);
      folded({ u1: 438, u2: 493, v1: -60, v2: -4, z: 216.6, h: 44, add: (a1, a2, c1, c2, za, zb, m) => quiet(b(...frA(a1, a2, c1, c2), za, zb, m)) }, 2, linenCols, 6);
      hingeDoor({ n: nA, f: fA, u1: 433, u2: 498, z0: 4, z1: 177, hinge: 'u1', front: C.walnut });
      hingeDoor({ n: nA, f: fA, u1: 433, u2: 498, z0: 177, z1: 263, hinge: 'u1', front: C.walnut });
      block([835, 433, 900, 498]);

      // ---------- 100 cm vanity: stone top with undermount basin, toiletry drawer, 3 laundry-basket pull-outs below
      const nV = [-1, 0], fV = 852, frV = frame(nV, fV);
      quiet(b(852, 500, 900, 602, 0, 4, C.black));
      shell(nV, fV, 500, 602, 48, 4, 82, C.walnut);
      drawer({ n: nV, f: fV, u1: 500, u2: 602, z0: 64, z1: 82, depth: 46, front: fluted(102), fill: (a) => {
        grid(a, 4, 1, 6); smalls(a, 8, 3, ['#efe9df', '#c58b7a', '#9fb3c2', '#2a2a2a', '#e3c9a8'], 8); } });
      const bag = (col, label) => (a) => {
        a.add(a.u1 + 1, a.u2 - 1, a.v1 + 1, a.v2 - 1, a.z, a.z + a.h - 2, mat(col, { roughness: 1 }));
        for (let k = 0; k < 4; k++) a.add(a.u1 + 3 + rnd() * 14, a.u1 + 10 + rnd() * 14, a.v1 + 5 + rnd() * 26, a.v1 + 14 + rnd() * 26, a.z + a.h - 2, a.z + a.h + 1, pick(label));
      };
      [['#efede8', ['#ffffff', '#efe9df', '#e3e6ea']], ['#3a3a3a', ['#222222', '#2f3a4a', '#3d3d3d']], ['#8e9c86', ['#9e3f3a', '#6d7f99', '#c7a98a']]]
        .forEach(([c, l], k) => drawer({ n: nV, f: fV, u1: 500 + k * 34, u2: 534 + k * 34, z0: 4, z1: 64, depth: 46, front: fluted(34), fill: bag(c, l) }));
      b(850, 500, 900, 602, 82, 85, stone);                            // stone top
      quiet(b(860, 532, 894, 572, 84.6, 85.2, mat('#f4f3f0', { roughness: 0.2 })));   // undermount basin rim
      quiet(b(863, 535, 891, 569, 84.8, 85.3, mat('#d9dcdc', { roughness: 0.15 })));
      quiet(b(895, 549.5, 900, 554.5, 104, 107, blackMetal)); quiet(b(884, 551, 899, 553, 105, 106.5, blackMetal));   // wall spout
      // mirror cabinet above (100 x 15 x 70) with mirror doors, LED strip under it, shelves inside
      const nM = [-1, 0], fM = 885, frM = frame(nM, fM);
      shell(nM, fM, 502, 600, 15, 115, 185, C.walnut);
      quiet(b(...frM(504, 598, -4, -2), 113.6, 115, C.lightGlow));
      for (const z of [138, 161]) quiet(b(...frM(504, 598, -14, -2), z, z + 1.2, mat('#dfe8ea', { roughness: 0.05, transparent: true, opacity: 0.6 })));
      for (const z0 of [116.8, 139.2, 162.2]) for (let u = 507; u < 594; u += 7 + rnd() * 4) quiet(cylinder(...frM(u, u, -8, -8).slice(0, 2), z0, z0 + 8 + rnd() * 8, 1.6 + rnd() * 1.2, pick(['#efe9df', '#c58b7a', '#9fb3c2', '#2a2a2a', '#e3c9a8', '#8f9a8a'])));
      const mirrorFront = mat('#c9d5da', { roughness: 0.05, metalness: 0.25 });
      hingeDoor({ n: nM, f: fM, u1: 502, u2: 551, z0: 115, z1: 185, hinge: 'u1', front: mirrorFront });
      hingeDoor({ n: nM, f: fM, u1: 551, u2: 600, z0: 115, z1: 185, hinge: 'u2', front: mirrorFront });
      // open walnut shelf above with towels
      b(870, 500, 900, 602, 205, 207, C.walnut);
      folded({ u1: 505, u2: 597, v1: -28, v2: -4, z: 207, h: 26, add: (a1, a2, c1, c2, za, zb, m) => quiet(b(...frame(nV, 900)(a1, a2, c1, c2), za, zb, m)) }, 3, linenCols, 6);
      block([850, 500, 900, 602]);
    });

    // ---------- wall-hung WC with concealed cistern in a tiled ledge (shelf on top) on the south wall
    quiet(b(762.6, 678, 865, 697.4, 0, 110, tileMat(102, 110)));
    b(762.6, 676, 865, 697.4, 110, 112, C.walnut);                    // shelf
    quiet(b(785, 677.4, 805, 678, 92, 106, blackMetal));               // flush plate
    const oval = (cx, cy, rx, ry, z0, z1, m) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, M(z1 - z0), 40), m); o.scale.set(M(rx), 1, M(ry)); o.position.set(M(cx), M((z0 + z1) / 2), M(cy)); o.castShadow = true; group.add(o); return o; };
    oval(795, 651, 18, 27, 26, 40, white);                             // bowl
    oval(795, 651, 18.5, 27.5, 40, 42.5, white);                       // seat
    quiet(b(785, 672, 805, 678, 28, 41, white));
    quiet(b(762.6, 630, 766, 646, 68, 71, blackMetal)); quiet(cylinder(768, 638, 62, 72, 5, white));   // paper holder
    quiet(cylinder(820, 688, 112, 128, 4, mat('#8f9a8a'))); quiet(b(835, 683, 855, 692, 112, 114, mat('#e9e3d8')));
    block([762, 624, 815, 698]);
    block([762, 676, 865, 698]);
    // built-in cabinet above the WC, flush with the installation ledge (20 deep), from 140 cm to the ceiling
    {
      const nW = [0, -1], fW = 678, frW = frame(nW, fW);
      shell(nW, fW, 763, 865, 20, 140, 263, C.walnut);
      quiet(b(...frW(765, 863, -4, -2), 138.6, 140, C.lightGlow));      // LED under the cabinet – lights the shelf niche
      for (const z of [180, 222]) b(...frW(765, 863, -18, -2), z, z + 1.6, C.inner);
      // toilet paper, spare toiletries, cleaning products, towels on top
      for (let k = 0; k < 6; k++) quiet(cylinder(...frW(772 + k * 8.5, 772 + k * 8.5, -10, -10).slice(0, 2), 141.8, 152, 4, mat('#f6f5f2', { roughness: 1 })));
      for (let k = 0; k < 6; k++) quiet(cylinder(...frW(772 + k * 8.5, 772 + k * 8.5, -10, -10).slice(0, 2), 152.2, 162.4, 4, mat('#f6f5f2', { roughness: 1 })));
      for (let u = 825; u < 860; u += 7) quiet(cylinder(...frW(u, u, -10, -10).slice(0, 2), 141.8, 156 + rnd() * 10, 2.8, pick(['#e6eef0', '#9fc3d0', '#f0e2b6', '#c7d6c0'])));
      for (let u = 768; u < 860; u += 8 + rnd() * 4) quiet(cylinder(...frW(u, u, -10, -10).slice(0, 2), 181.6, 192 + rnd() * 8, 2.2, pick(['#efe9df', '#c58b7a', '#9fb3c2', '#2a2a2a', '#e3c9a8'])));
      folded({ u1: 766, u2: 862, v1: -18, v2: -3, z: 223.6, h: 34, add: (a1, a2, c1, c2, za, zb, m) => quiet(b(...frW(a1, a2, c1, c2), za, zb, m)) }, 3, linenCols, 6);
      hingeDoor({ n: nW, f: fW, u1: 763, u2: 814, z0: 140, z1: 263, hinge: 'u1', front: C.walnut });
      hingeDoor({ n: nW, f: fW, u1: 814, u2: 865, z0: 140, z1: 263, hinge: 'u2', front: C.walnut });
    }

    // ---------- walk-in level shower 90 x 92: linear drain, glass hinged door + fixed panels, rain head, lit niche
    quiet(b(951, 612, 957, 692, 0, 0.35, steel));                      // linear drain along the east wall
    quiet(b(951.5, 613, 956.5, 691, 0.35, 0.45, mat('#2a2a2a')));
    b(871, 666, 873, 698, 0, 200, showerGlass);                       // fixed panel (WC side)
    b(873, 604.4, 900, 606, 0, 200, showerGlass);                     // fixed return
    quiet(b(871, 604.4, 873, 698, 199, 200.5, blackMetal));            // thin black frame top
    quiet(b(873, 604.4, 900, 606, 199, 200.5, blackMetal));
    hingeDoor({ n: [-1, 0], f: 873, u1: 606, u2: 666, z0: 0.5, z1: 200, hinge: 'u1', front: showerGlass });
    block([871, 666, 873, 698]); block([873, 604, 900, 606]);
    quiet(cylinder(918, 652, 213, 215, 15, steel));                    // rain shower head
    quiet(b(916, 650, 963, 654, 215, 218, steel));                     // arm from the wall
    quiet(b(961.5, 640, 962.4, 664, 98, 116, steel));                  // concealed mixer plate
    quiet(b(961, 680, 962.4, 684, 100, 160, steel));                   // hand shower rail
    quiet(b(890, 696, 950, 697.4, 110, 145, mat('#bdb3a6')));          // wall niche (recessed look)
    quiet(b(890, 695.5, 950, 697.4, 144, 145, C.lightGlow));
    for (const [x, c] of [[898, '#e9d6b8'], [908, '#8f9a8a'], [918, '#efe9df']]) quiet(cylinder(x, 692, 110, 128, 3, mat(c, { roughness: 0.3 })));

    // ---------- heated towel rail (black) on the west wall between the door and the WC
    for (const y of [548, 598]) quiet(b(763, y - 1.2, 766, y + 1.2, 60, 165, blackMetal));
    for (let z = 66; z < 165; z += 12) quiet(b(763.6, 548, 765.6, 598, z, z + 1.6, blackMetal));
    quiet(b(766, 551, 769, 595, 120, 158, mat('#cfc4b3', { roughness: 1 })));   // towel
    block([762, 544, 770, 602]);

    // ceiling lights + fan
    for (const [x, y] of [[798, 500], [798, 570], [918, 652]]) quiet(cylinder(x, y, H - 1, H, 4.5, C.lightGlow));
    quiet(cylinder(845, 640, H - 1, H, 10, mat('#efefec')));
  }

  // ======================= BEDROOM 1: built-in wardrobe along the west wall (opposite the door) =======================
  // 335 x 60, floor to ceiling, 6 push-to-open doors + 6 top doors; front at x 60, faces +x
  {
    const nW = [1, 0], fW = 60, frW = frame(nW, fW);
    quiet(b(0, 0, 58, 335, 0, 6, C.black));                           // recessed plinth
    shell(nW, fW, 0, 335, 60, 6, 263, C.walnut);
    const cols = [0, 111.7, 223.3, 279.2, 335];                        // sections: long hang | double hang | shelves | drawers + shelves
    for (const u of cols.slice(1, -1)) b(...frW(u - 0.9, u + 0.9, -60, -2), 6, 263, C.walnut);
    b(...frW(1.8, 333.2, -60, -2), 223, 224.8, C.walnut);              // shelf under the top boxes
    const railY = (u1, u2, z) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(M(1.2), M(1.2), M(u2 - u1), 12), C.black);
      m.rotation.x = Math.PI / 2; m.position.set(M(30), M(z), M((u1 + u2) / 2)); group.add(m);
    };
    const hang = (u1, u2, top, minL, maxL) => {
      for (let y = u1 + 3; y < u2 - 4; y += 3.6 + rnd() * 2.5) {
        const len = minL + rnd() * (maxL - minL);
        quiet(b(8 + rnd() * 3, y, 52 - rnd() * 3, y + 2.4, top - len, top - 3, pick(clothCols)));
      }
    };
    // section 1 (0–111.7): long hanging – coats, dresses; shoe shelves below
    railY(1.8, 110.8, 212); hang(1.8, 110.8, 210, 105, 150);
    for (const z of [22, 42]) {
      b(...frW(1.8, 110.8, -58, -4), z, z + 1.6, C.inner);
      for (let y = 6; y < 104; y += 13) { const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#8e3b36', '#e8e2d6']); quiet(b(...frW(y, y + 5, -45, -8), z + 1.6, z + 9, m)); quiet(b(...frW(y + 6, y + 11, -45, -8), z + 1.6, z + 9, m)); }
    }
    for (let y = 6; y < 104; y += 13) { const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a']); quiet(b(...frW(y, y + 5, -45, -8), 6, 13, m)); quiet(b(...frW(y + 6, y + 11, -45, -8), 6, 13, m)); }
    // section 2 (111.7–223.3): double hanging – shirts, trousers
    railY(112.6, 222.4, 212); hang(112.6, 222.4, 210, 70, 85);
    b(...frW(112.6, 222.4, -58, -2), 118, 119.6, C.inner);
    railY(112.6, 222.4, 112); hang(112.6, 222.4, 110, 55, 65);
    // section 3 (223.3–279.2): shelves with folded clothes
    const sAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...frW(a1, a2, c1, c2), za, zb, m));
    const sh3 = [6, 44, 82, 120, 158, 192];
    for (const z of sh3.slice(1)) b(...frW(224.2, 278.3, -58, -2), z, z + 1.6, C.inner);
    sh3.forEach((z, k) => folded({ u1: 225, u2: 277, v1: -55, v2: -6, z: z + (k ? 1.6 : 0), h: 28, add: sAdd }, 2, k > 3 ? linenCols : clothCols, 4.5));
    // section 4 (279.2–335): 4 inner drawers with organisers, shelves above
    const dFills = [
      (a) => { a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvet); const a2 = { ...a, z: a.z + 0.6, h: 4 }; grid(a2, 4, 4, 3.5, C.velvetDark); smalls(a2, 8, 6, gold, 2); },
      (a) => { grid(a, 4, 5, 9); smalls(a, 4, 5, ['#e8e2d6', '#d9b8a8', '#2a2a2a', '#c7b49b'], 6); },
      (a) => folded(a, 2, clothCols, 3),
      (a) => folded(a, 2, linenCols, 5),
    ];
    [[69, 88], [50, 69], [28, 50], [6, 28]].forEach(([z0, z1], i) =>
      drawer({ n: nW, f: fW - 3, u1: 280.4, u2: 333.4, z0, z1, depth: 52, front: C.walnut, grip: 'top', fill: dFills[i] }));
    for (const z of [90, 130, 172]) b(...frW(280.1, 333.2, -58, -2), z, z + 1.6, C.inner);
    folded({ u1: 281, u2: 332, v1: -55, v2: -6, z: 91.6, h: 30, add: sAdd }, 2, clothCols, 5);
    sAdd(283, 330, -50, -10, 131.6, 160, mat('#7a5a43', { roughness: 0.6 }));                  // bag
    folded({ u1: 281, u2: 332, v1: -55, v2: -6, z: 173.6, h: 34, add: sAdd }, 2, linenCols, 6);
    // top boxes
    for (let y = 4; y < 330; y += 41) sAdd(y, Math.min(y + 37, 332), -54, -6, 224.8, 250, pick([C.box, mat('#c8b49a'), mat('#9aa7ad')]));
    // LED strips inside (door switch)
    for (const [u1, u2] of [[1.8, 110.8], [112.6, 222.4]]) quiet(b(...frW(u1, u2, -6, -4), 221, 222.8, C.lightGlow));
    // doors: 6 tall (to 224) + 6 top (224–263), push-to-open, hinged in pairs
    const dw = 335 / 6;
    for (let i = 0; i < 6; i++) {
      const u1 = i * dw, u2 = (i + 1) * dw, hinge = i % 2 ? 'u2' : 'u1';
      hingeDoor({ n: nW, f: fW, u1, u2, z0: 6, z1: 224, hinge, front: C.walnut });
      hingeDoor({ n: nW, f: fW, u1, u2, z0: 224, z1: 263, hinge, front: C.walnut });
    }
    block([0, 0, 60, 335]);
  }

  // closet ceiling light + sensor
  cylinder(850, 813, H - 3, H, 14, C.lightGlow).castShadow = false;
  cylinder(772, 813, H - 2, H, 4, C.plate).castShadow = false;
  // LED strip under the hat shelf
  b(756, 765, 961, 767, 203.5, 205, C.lightGlow).castShadow = false;

  // --- sliding fluted-glass doors: 3 telescopic panels on a ceiling track
  const glass = flutedGlass();
  b(737, 707, 753, 900, H - 4, H, C.black).castShadow = false;   // top track
  b(737, 707, 753, 900, 0, 0.6, C.black).castShadow = false;     // floor guide
  const door = { kind: 'slider', frac: 0, target: 0, rect: [738, 776, 752, 897].map(M),
    center: new THREE.Vector2(M(745), M(803)), panels: [] };
  block([737, 708, 753, 776]); // where the panels stack when open
  const panelW = 65, step = 61;
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const x1 = 739.5 + i * 4.5, x2 = x1 + 3;
    const y1 = 710 + i * step, y2 = y1 + panelW;
    const parts = [
      b(x1, y1, x2, y1 + 2.5, 1, 260, C.black, g), b(x1, y2 - 2.5, x2, y2, 1, 260, C.black, g),
      b(x1, y1, x2, y2, 1, 3.5, C.black, g), b(x1, y1, x2, y2, 257.5, 260, C.black, g),
      b(x1 + 1, y1 + 2.5, x2 - 1, y2 - 2.5, 3.5, 257.5, glass, g),
    ];
    parts[4].castShadow = false;
    for (const p of parts) { p.userData.door = door; pickables.push(p); }
    group.add(g);
    door.panels.push({ g, dz: M(710 - y1) });
  }
  door.apply = () => { for (const p of door.panels) p.g.position.z = p.dz * door.frac; };
  door.apply();
  addDoor(door);

  // ======================= ELECTRICAL PLATES =======================
  const realGroupAll = group;
  for (const p of ELECTRIC) for (const vk of [].concat(p.variant || [null])) {
    group = vk ? variants[vk].g : realGroupAll;
    if (p.floor) { quiet(b(p.x - 7, p.y - 7, p.x + 7, p.y + 7, 0, 0.6, C.metal)); continue; }
    if (p.ceil || p.plate === false) continue;
    const w = p.w || 8, [nx, ny] = p.n;
    let r;
    if (ny) r = [p.x - w / 2, ny > 0 ? p.y : p.y - 1, p.x + w / 2, ny > 0 ? p.y + 1 : p.y];
    else r = [nx > 0 ? p.x : p.x - 1, p.y - w / 2, nx > 0 ? p.x + 1 : p.x, p.y + w / 2];
    const m = b(...r, p.h - 4, p.h + 4, C.plate);
    m.castShadow = false;
  }
  group = realGroupAll;

  // living-room layout variants: A = sofa against the bedroom wall, TV on the pole; B = swapped
  const fam = (k) => (k.startsWith('b') ? 'bath' : k.startsWith('k') ? 'kitchen' : 'living');
  const setVariant = (key) => {
    for (const [k, v] of Object.entries(variants)) {
      if (fam(k) !== fam(key)) continue;
      v.g.visible = k === key;
      for (const c of v.cols) { const i = colliders.indexOf(c); if (k === key && i < 0) colliders.push(c); if (k !== key && i >= 0) colliders.splice(i, 1); }
    }
  };
  setVariant('A');
  setVariant('bA');
  setVariant('k1');
  return { setVariant };
}
