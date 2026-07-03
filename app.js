const PLAN = [
  {
    weeks: [1, 2],
    title: "Вход",
    calories: 2300,
    deficit: "~550 ккал",
    pace: "0.5-0.7 кг/нед",
    morning: [
      ["Разминка", "3 мин: руки, корпус, таз, ходьба, jumping jacks"],
      ["Ходьба на месте", "20 мин, спокойный темп"],
      ["Скручивания лежа", "3 круга по 15"],
      ["Планка на локтях", "3 круга по 20 сек"],
      ["Подъемы прямых ног", "3 круга по 12"]
    ],
    evening: [
      ["Отжимания с колен", "4 x 12"],
      ["Приседания", "4 x 20"],
      ["Выпады на месте", "3 x 10 на ногу"],
      ["Ягодичный мостик", "3 x 15"],
      ["Планка на локтях", "3 x 30 сек"],
      ["Воскресенье", "Ходьба 30 мин + растяжка 10 мин"]
    ]
  },
  {
    weeks: [3, 4],
    title: "Наращивание",
    calories: 2100,
    deficit: "~750 ккал",
    pace: "0.7-0.9 кг/нед",
    morning: [
      ["Разминка", "3 мин"],
      ["Интервалы", "8 кругов: бег 60 сек, jumping jacks 30 сек, ходьба 30 сек"],
      ["Велосипед", "3 круга по 20"],
      ["Планка", "3 круга по 30 сек"],
      ["Русские скручивания", "3 круга по 20"]
    ],
    evening: [
      ["Отжимания с колен / классические", "4 x 15"],
      ["Приседания", "4 x 25"],
      ["Обратные выпады", "3 x 12 на ногу"],
      ["Ягодичный мостик", "4 x 18"],
      ["Супермен", "3 x 15"],
      ["Планка", "3 x 40 сек"],
      ["Воскресенье", "Ходьба 40 мин + растяжка"]
    ]
  },
  {
    weeks: [5],
    title: "Пик объема",
    calories: 2100,
    deficit: "~750 ккал",
    pace: "0.7-0.9 кг/нед",
    morning: [
      ["Разминка", "3 мин"],
      ["Бёрпи без отжимания", "10 кругов: 30 сек работа"],
      ["Ходьба на месте", "10 кругов: 60 сек восстановление"],
      ["Скручивания", "3 круга по 20"],
      ["Боковая планка", "3 круга по 20 сек на сторону"],
      ["Подъемы ног", "3 круга по 15"]
    ],
    evening: [
      ["Отжимания", "4 подхода: классика сколько сможешь, добить с колен до 15"],
      ["Приседания", "4 x 30"],
      ["Болгарские выпады", "3 x 10 на ногу"],
      ["Ягодичный мостик на одной ноге", "3 x 12"],
      ["Супермен", "3 x 18"],
      ["Планка", "3 x 50 сек"],
      ["Воскресенье", "Ходьба 45 мин"]
    ]
  },
  {
    weeks: [6, 7],
    title: "Максимальный дефицит",
    calories: 2000,
    deficit: "~850 ккал",
    pace: "0.8-1.0 кг/нед",
    morning: [
      ["Разминка", "3 мин"],
      ["HIIT", "12 кругов по 60 сек: 40 сек работа / 20 сек отдых"],
      ["Порядок", "Бёрпи, прыжки из приседа, скалолаз, jumping jacks - 3 цикла"],
      ["Велосипед", "3 круга по 25"],
      ["Планка", "3 круга по 50 сек"],
      ["Боковая планка", "3 круга по 25 сек на сторону"]
    ],
    evening: [
      ["Отжимания", "5 подходов до почти отказа"],
      ["Приседания с паузой", "4 x 25, пауза 2 сек внизу"],
      ["Болгарские выпады", "4 x 12 на ногу"],
      ["Ягодичный мостик", "4 x 20"],
      ["Супермен", "3 x 20"],
      ["Планка + боковая планка", "по 3 подхода"],
      ["Воскресенье", "Ходьба 45-50 мин + растяжка"]
    ]
  },
  {
    weeks: [8],
    title: "Разгрузка и закрепление",
    calories: 2250,
    deficit: "~600 ккал",
    pace: "закрепление",
    morning: [
      ["Разминка", "3 мин"],
      ["Бег на месте", "20 мин, средняя интенсивность"],
      ["Скручивания", "3 круга по 15"],
      ["Планка", "3 круга по 40 сек"]
    ],
    evening: [
      ["Отжимания", "3 x макс"],
      ["Приседания", "3 x 20"],
      ["Выпады", "3 x 10"],
      ["Ягодичный мостик", "3 x 15"],
      ["Планка", "3 x 40 сек"],
      ["Воскресенье", "Ходьба + полная растяжка"]
    ]
  }
];

const STORAGE_KEY = "training-app-state-v1";
const SETTINGS_KEY = "training-app-settings-v1";

const state = loadState();
let supabaseClient = null;
let currentUser = null;
let authSubscription = null;

const els = {
  dateInput: document.querySelector("#dateInput"),
  weekSelect: document.querySelector("#weekSelect"),
  todayLabel: document.querySelector("#todayLabel"),
  phaseLabel: document.querySelector("#phaseLabel"),
  remainingCalories: document.querySelector("#remainingCalories"),
  dailyCalories: document.querySelector("#dailyCalories"),
  doneWorkouts: document.querySelector("#doneWorkouts"),
  streakDays: document.querySelector("#streakDays"),
  morningPlan: document.querySelector("#morningPlan"),
  eveningPlan: document.querySelector("#eveningPlan"),
  morningDone: document.querySelector("#morningDone"),
  eveningDone: document.querySelector("#eveningDone"),
  dayNote: document.querySelector("#dayNote"),
  foodForm: document.querySelector("#foodForm"),
  foodName: document.querySelector("#foodName"),
  foodCalories: document.querySelector("#foodCalories"),
  foodList: document.querySelector("#foodList"),
  weightForm: document.querySelector("#weightForm"),
  weightInput: document.querySelector("#weightInput"),
  weightList: document.querySelector("#weightList"),
  progressGrid: document.querySelector("#progressGrid"),
  caloriePhases: document.querySelector("#caloriePhases"),
  settingsDialog: document.querySelector("#settingsDialog"),
  settingsBtn: document.querySelector("#settingsBtn"),
  supabaseUrl: document.querySelector("#supabaseUrl"),
  supabaseKey: document.querySelector("#supabaseKey"),
  loginEmail: document.querySelector("#loginEmail"),
  saveSettings: document.querySelector("#saveSettings"),
  loginBtn: document.querySelector("#loginBtn"),
  syncStatus: document.querySelector("#syncStatus")
};

init();

async function init() {
  const today = new Date().toISOString().slice(0, 10);
  els.dateInput.value = state.selectedDate || today;

  for (let week = 1; week <= 8; week += 1) {
    const option = document.createElement("option");
    option.value = String(week);
    option.textContent = `Неделя ${week}`;
    els.weekSelect.append(option);
  }
  els.weekSelect.value = String(state.currentWeek || 1);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  els.dateInput.addEventListener("change", () => {
    state.selectedDate = els.dateInput.value;
    persist("Дата сохранена.");
    render();
  });
  els.weekSelect.addEventListener("change", () => {
    state.currentWeek = Number(els.weekSelect.value);
    persist("Неделя сохранена.");
    render();
  });
  els.morningDone.addEventListener("change", () => setDayField("morningDone", els.morningDone.checked));
  els.eveningDone.addEventListener("change", () => setDayField("eveningDone", els.eveningDone.checked));
  els.dayNote.addEventListener("input", () => setDayField("note", els.dayNote.value));
  els.foodForm.addEventListener("submit", addFood);
  els.weightForm.addEventListener("submit", addWeight);
  els.settingsBtn.addEventListener("click", openSettings);
  els.saveSettings.addEventListener("click", saveSettings);
  els.loginBtn.addEventListener("click", login);

  await setupSupabase();
  render();
}

function getPhase(week = state.currentWeek) {
  return PLAN.find((phase) => phase.weeks.includes(Number(week))) || PLAN[0];
}

function getDay() {
  const key = els.dateInput.value;
  state.days[key] ||= { foods: [], morningDone: false, eveningDone: false, note: "" };
  return state.days[key];
}

function setDayField(field, value) {
  getDay()[field] = value;
  persist("Изменения сохранены.");
  render();
}

function render() {
  const phase = getPhase();
  const day = getDay();
  const eaten = day.foods.reduce((sum, item) => sum + Number(item.calories), 0);
  const doneCount = Number(day.morningDone) + Number(day.eveningDone);

  els.weekSelect.value = String(state.currentWeek);
  els.todayLabel.textContent = `Неделя ${state.currentWeek}`;
  els.phaseLabel.textContent = phase.title;
  els.dailyCalories.textContent = phase.calories;
  els.remainingCalories.textContent = Math.max(phase.calories - eaten, 0);
  els.doneWorkouts.textContent = `${doneCount}/2`;
  els.streakDays.textContent = `${calculateStreak()} дней`;
  els.morningDone.checked = day.morningDone;
  els.eveningDone.checked = day.eveningDone;
  els.dayNote.value = day.note || "";

  renderRoutine(els.morningPlan, phase.morning);
  renderRoutine(els.eveningPlan, phase.evening);
  renderFood(day.foods);
  renderWeights();
  renderProgressGrid();
  renderPhases();
}

function renderRoutine(target, items) {
  target.innerHTML = "";
  const list = document.createElement("ul");
  list.className = "routine";
  items.forEach(([name, detail]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${escapeHtml(name)}</strong><small>${escapeHtml(detail)}</small>`;
    list.append(li);
  });
  target.append(list);
}

function addFood(event) {
  event.preventDefault();
  const name = els.foodName.value.trim();
  const calories = Number(els.foodCalories.value);
  if (!name || !calories) return;
  getDay().foods.push({ id: crypto.randomUUID(), name, calories });
  els.foodName.value = "";
  els.foodCalories.value = "";
  persist("Еда сохранена.");
  render();
}

function renderFood(items) {
  els.foodList.innerHTML = "";
  if (!items.length) {
    els.foodList.innerHTML = "<li><span>Пока ничего не добавлено</span><span>0 ккал</span></li>";
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${escapeHtml(item.name)}</span><b>${Number(item.calories)} ккал</b>`;
    const button = document.createElement("button");
    button.className = "delete-btn";
    button.type = "button";
    button.textContent = "×";
    button.title = "Удалить";
    button.addEventListener("click", () => {
      getDay().foods = getDay().foods.filter((food) => food.id !== item.id);
      persist("Еда удалена.");
      render();
    });
    li.append(button);
    els.foodList.append(li);
  });
}

function addWeight(event) {
  event.preventDefault();
  const value = Number(els.weightInput.value);
  if (!value) return;
  state.weights.unshift({ id: crypto.randomUUID(), date: els.dateInput.value, value });
  els.weightInput.value = "";
  persist("Вес сохранен.");
  render();
}

function renderWeights() {
  els.weightList.innerHTML = "";
  if (!state.weights.length) {
    els.weightList.innerHTML = "<li><span>Нет записей</span><span>-</span></li>";
    return;
  }
  state.weights.slice(0, 8).forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${formatDate(row.date)}</span><b>${row.value} кг</b>`;
    els.weightList.append(li);
  });
}

function renderProgressGrid() {
  els.progressGrid.innerHTML = "";
  const dates = Object.keys(state.days).sort().slice(-28);
  const shown = dates.length ? dates : [els.dateInput.value];
  shown.forEach((date) => {
    const day = state.days[date];
    const cell = document.createElement("div");
    cell.className = `day-cell ${day?.morningDone && day?.eveningDone ? "done" : ""}`;
    cell.textContent = new Date(`${date}T00:00:00`).getDate();
    cell.title = `${formatDate(date)}: ${day?.morningDone ? "утро" : "-"} / ${day?.eveningDone ? "вечер" : "-"}`;
    els.progressGrid.append(cell);
  });
}

function renderPhases() {
  els.caloriePhases.innerHTML = "";
  PLAN.forEach((phase) => {
    const div = document.createElement("div");
    div.className = "phase";
    div.innerHTML = `<b>Недели ${phase.weeks.join("-")}</b><span>${phase.calories} ккал/день</span><small>${phase.deficit}, ${phase.pace}</small>`;
    els.caloriePhases.append(div);
  });
}

function calculateStreak() {
  const dates = Object.keys(state.days).sort().reverse();
  let streak = 0;
  for (const date of dates) {
    const day = state.days[date];
    if (day.morningDone && day.eveningDone) streak += 1;
    else break;
  }
  return streak;
}

function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabId));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return { currentWeek: 1, selectedDate: "", days: {}, weights: [] };
}

async function persist(successMessage = "Сохранено.") {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    setSyncStatus(`Ошибка локального сохранения: ${error.message}`, true);
    return false;
  }

  if (!supabaseClient) {
    setSyncStatus(`${successMessage} Облако не подключено, данные пока только в этом браузере.`);
    return true;
  }

  if (!currentUser) {
    setSyncStatus(`${successMessage} Для облака нужно войти по email.`);
    return true;
  }

  const { error } = await supabaseClient
    .from("training_state")
    .upsert({ user_id: currentUser.id, payload: state, updated_at: new Date().toISOString() });

  if (error) {
    setSyncStatus(`Не удалось сохранить в Supabase: ${error.message}`, true);
    return false;
  }

  setSyncStatus(`${successMessage} Облако синхронизировано: ${currentUser.email}`);
  return true;
}

function openSettings() {
  const settings = loadSettings();
  els.supabaseUrl.value = settings.url || "";
  els.supabaseKey.value = settings.key || "";
  els.loginEmail.value = settings.email || "";
  setSyncStatus(currentUser ? `Вход выполнен: ${currentUser.email}` : "Локальный режим");
  els.settingsDialog.showModal();
}

async function saveSettings() {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({ url: els.supabaseUrl.value.trim(), key: els.supabaseKey.value.trim(), email: els.loginEmail.value.trim() })
  );
  setSyncStatus("Настройки сохранены. Проверяю подключение...");
  await setupSupabase();
}

function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  return saved ? JSON.parse(saved) : {};
}

async function setupSupabase() {
  const settings = loadSettings();
  if (!settings.url || !settings.key || !window.supabase) return;

  supabaseClient = window.supabase.createClient(settings.url, settings.key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });

  if (authSubscription) {
    authSubscription.unsubscribe();
    authSubscription = null;
  }

  const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
  if (sessionError) {
    setSyncStatus(`Ошибка входа Supabase: ${sessionError.message}`, true);
    return;
  }

  currentUser = sessionData?.session?.user || null;

  const { data: listener } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    currentUser = session?.user || null;
    if (currentUser) {
      await pullRemoteState();
      await persist("Вход выполнен.");
    } else {
      setSyncStatus("Локальный режим.");
    }
    render();
  });
  authSubscription = listener?.subscription || null;

  if (currentUser) {
    await pullRemoteState();
    await persist("Подключение проверено.");
  } else {
    setSyncStatus("Supabase подключен. Теперь войди по email.");
  }
}

async function login() {
  await saveSettings();
  if (!supabaseClient) {
    setSyncStatus("Сначала вставь URL и anon key Supabase.", true);
    return;
  }
  const email = els.loginEmail.value.trim();
  if (!email) {
    setSyncStatus("Укажи email.", true);
    return;
  }
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: location.href }
  });
  setSyncStatus(error ? `Ошибка отправки письма: ${error.message}` : "Ссылка для входа отправлена на email.", Boolean(error));
}

async function pullRemoteState() {
  if (!supabaseClient || !currentUser) return;
  const { data, error } = await supabaseClient.from("training_state").select("payload").eq("user_id", currentUser.id).maybeSingle();
  if (error) {
    setSyncStatus(`Не удалось загрузить данные Supabase: ${error.message}`, true);
    return;
  }
  if (data?.payload) {
    Object.assign(state, data.payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSyncStatus(`Данные загружены из облака: ${currentUser.email}`);
  } else {
    await persist("Создана первая облачная запись.");
  }
}

function setSyncStatus(message, isError = false) {
  if (!els.syncStatus) return;
  els.syncStatus.textContent = message;
  els.syncStatus.style.color = isError ? "#9f2d20" : "";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }).format(new Date(`${date}T00:00:00`));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}
