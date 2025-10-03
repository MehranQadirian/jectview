
export async function loadProjects() {
  try {
    const res = await fetch('./data/projects.json?t=' + Date.now());
    const data = await res.json();
    // normalize date
    data.forEach(p => p.date = new Date(p.date).toISOString());
    return data;
  } catch (e) {
    console.error('Failed loadProjects', e);
    return [];
  }
}

export async function loadUsers() {
  try {
    const res = await fetch('./data/users.json?t=' + Date.now());
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Failed loadUsers', e);
    return [];
  }
}
