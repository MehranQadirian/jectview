<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Showcase</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-red: #ee5d4f;
            --primary-blue: #3d3bc9;
            --primary-green: #76ed5d;
            --primary-cyan: #7bc6da;
            --gray-1: #4f4f4f;
            --gray-2: #696969;
            --white: #ffffff;
            --blue-dark: #325f78;
            --blue-darker: #234354;
            --pink: #ba0d55;
            --cyan-bright: #3edee6;
            --purple: #8d04d8;
            --orange: #ef8e4a;
            --orange-dark: #cd5f00;
            --black: #373737;
            --purple-dark: #221540;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            transition: background-color 0.3s, color 0.3s;
        }

        body.light-theme {
            background: linear-gradient(135deg, var(--white) 0%, #f5f5f5 100%);
            color: var(--black);
        }

        body.dark-theme {
            background: linear-gradient(135deg, var(--black) 0%, var(--purple-dark) 100%);
            color: var(--white);
        }

        .header {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
            border-bottom: 2px solid var(--primary-cyan);
        }

        .light-theme .header {
            background: rgba(255, 255, 255, 0.9);
        }

        .dark-theme .header {
            background: rgba(34, 21, 64, 0.9);
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(90deg, var(--primary-red), var(--primary-blue), var(--primary-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hamburger {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
        }

        .hamburger span {
            width: 30px;
            height: 3px;
            background: var(--primary-cyan);
            transition: 0.3s;
            border-radius: 3px;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(8px, -8px);
        }

        .sidebar {
            position: fixed;
            top: 0;
            right: -300px;
            width: 300px;
            height: 100%;
            transition: right 0.3s;
            z-index: 200;
            padding: 80px 20px 20px 20px;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
        }

        .light-theme .sidebar {
            background: var(--white);
        }

        .dark-theme .sidebar {
            background: var(--purple-dark);
        }

        .sidebar.active {
            right: 0;
        }

        .sidebar nav a {
            display: block;
            padding: 15px;
            margin: 10px 0;
            text-decoration: none;
            border-radius: 8px;
            transition: 0.3s;
            font-weight: 500;
        }

        .light-theme .sidebar nav a {
            color: var(--black);
        }

        .dark-theme .sidebar nav a {
            color: var(--white);
        }

        .sidebar nav a:hover {
            background: var(--primary-cyan);
            color: var(--white);
            transform: translateX(-10px);
        }

        .theme-toggle {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: 20px;
        }

        .toggle-switch {
            width: 60px;
            height: 30px;
            background: var(--gray-2);
            border-radius: 15px;
            position: relative;
            cursor: pointer;
            transition: 0.3s;
        }

        .toggle-switch.active {
            background: var(--primary-blue);
        }

        .toggle-slider {
            width: 26px;
            height: 26px;
            background: var(--white);
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: 0.3s;
        }

        .toggle-switch.active .toggle-slider {
            left: 32px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .filters {
            display: flex;
            gap: 15px;
            margin: 30px 0;
            flex-wrap: wrap;
        }

        .filter-input, .filter-select {
            padding: 12px 20px;
            border: 2px solid var(--primary-cyan);
            border-radius: 8px;
            font-size: 16px;
            transition: 0.3s;
            outline: none;
        }

        .light-theme .filter-input, .light-theme .filter-select {
            background: var(--white);
            color: var(--black);
        }

        .dark-theme .filter-input, .dark-theme .filter-select {
            background: var(--blue-darker);
            color: var(--white);
        }

        .filter-input:focus, .filter-select:focus {
            border-color: var(--primary-blue);
            box-shadow: 0 0 10px rgba(61, 59, 201, 0.3);
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }

        .project-card {
            border-radius: 15px;
            padding: 25px;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
            border: 2px solid transparent;
        }

        .light-theme .project-card {
            background: var(--white);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .dark-theme .project-card {
            background: linear-gradient(135deg, var(--blue-darker) 0%, var(--purple-dark) 100%);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }

        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(61, 59, 201, 0.3);
            border-color: var(--primary-cyan);
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 15px;
        }

        .project-title {
            font-size: 22px;
            font-weight: bold;
            color: var(--primary-cyan);
            margin-bottom: 5px;
        }

        .project-type {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
        }

        .type-web { background: var(--primary-blue); color: var(--white); }
        .type-mobile { background: var(--primary-green); color: var(--black); }
        .type-desktop { background: var(--primary-red); color: var(--white); }
        .type-backend { background: var(--orange); color: var(--white); }
        .type-ai { background: var(--purple); color: var(--white); }
        .type-other { background: var(--gray-1); color: var(--white); }

        .project-description {
            margin: 15px 0;
            line-height: 1.6;
            opacity: 0.9;
        }

        .project-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid;
        }

        .light-theme .project-meta {
            border-color: #e0e0e0;
        }

        .dark-theme .project-meta {
            border-color: var(--blue-dark);
        }

        .project-author {
            font-weight: bold;
            color: var(--primary-green);
        }

        .project-date {
            font-size: 14px;
            opacity: 0.7;
        }

        .no-projects {
            text-align: center;
            padding: 60px 20px;
            font-size: 20px;
            opacity: 0.6;
        }

        .about-section, .users-section {
            max-width: 800px;
            margin: 50px auto;
            padding: 40px;
            border-radius: 15px;
        }

        .light-theme .about-section, .light-theme .users-section {
            background: var(--white);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .dark-theme .about-section, .dark-theme .users-section {
            background: linear-gradient(135deg, var(--blue-darker) 0%, var(--purple-dark) 100%);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }

        .section-title {
            font-size: 32px;
            margin-bottom: 20px;
            background: linear-gradient(90deg, var(--primary-red), var(--primary-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .user-card {
            padding: 20px;
            margin: 15px 0;
            border-radius: 10px;
            border-left: 4px solid var(--primary-cyan);
        }

        .light-theme .user-card {
            background: #f5f5f5;
        }

        .dark-theme .user-card {
            background: var(--blue-dark);
        }

        .user-name {
            font-size: 20px;
            font-weight: bold;
            color: var(--primary-cyan);
            margin-bottom: 5px;
        }

        .user-projects {
            opacity: 0.8;
        }

        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }

            .filters {
                flex-direction: column;
            }

            .filter-input, .filter-select {
                width: 100%;
            }
        }
    </style>
</head>
<body class="dark-theme">
    <div class="header">
        <div class="logo">Project Showcase</div>
        <div style="display: flex; align-items: center;">
            <div class="theme-toggle">
                <span>🌞</span>
                <div class="toggle-switch active" onclick="toggleTheme()">
                    <div class="toggle-slider"></div>
                </div>
                <span>🌙</span>
            </div>
            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>

    <div class="sidebar">
        <nav>
            <a href="#" onclick="showSection('projects')">Projects</a>
            <a href="#" onclick="showSection('users')">Users</a>
            <a href="#" onclick="showSection('about')">About Us</a>
        </nav>
    </div>

    <div class="container">
        <div id="projects-section">
            <div class="filters">
                <input type="text" class="filter-input" id="search" placeholder="Search projects..." oninput="filterProjects()">
                <select class="filter-select" id="typeFilter" onchange="filterProjects()">
                    <option value="">All Types</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop App</option>
                    <option value="backend">Backend</option>
                    <option value="ai">AI/ML</option>
                    <option value="other">Other</option>
                </select>
                <select class="filter-select" id="userFilter" onchange="filterProjects()">
                    <option value="">All Users</option>
                </select>
                <select class="filter-select" id="dateSort" onchange="filterProjects()">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            <div class="projects-grid" id="projectsGrid"></div>
        </div>

        <div id="users-section" class="users-section" style="display: none;">
            <h1 class="section-title">Our Contributors</h1>
            <div id="usersList"></div>
        </div>

        <div id="about-section" class="about-section" style="display: none;">
            <h1 class="section-title">About Us</h1>
            <p style="line-height: 1.8; margin-bottom: 20px;">
                Welcome to our Project Showcase platform! This is a collaborative space where developers can share their creative projects with the community.
            </p>
            <p style="line-height: 1.8; margin-bottom: 20px;">
                Our platform allows team members to easily submit their projects through our Telegram bot, making it simple to keep the showcase updated with the latest work.
            </p>
            <p style="line-height: 1.8;">
                Browse through various projects, filter by type and author, and get inspired by what our talented community is building!
            </p>
        </div>
    </div>

    <script>
        // Data stored in memory
        let projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
                type: "web",
                author: "John Doe",
                date: new Date("2024-09-15")
            },
            {
                id: 2,
                title: "Task Manager App",
                description: "Cross-platform mobile application for managing daily tasks with notifications and cloud sync.",
                type: "mobile",
                author: "Jane Smith",
                date: new Date("2024-10-01")
            },
            {
                id: 3,
                title: "AI Image Generator",
                description: "Machine learning model that generates unique images based on text descriptions using diffusion models.",
                type: "ai",
                author: "Alex Johnson",
                date: new Date("2024-08-20")
            },
            {
                id: 4,
                title: "Desktop IDE Extension",
                description: "Productivity extension for popular IDEs with code snippets, templates, and AI-powered suggestions.",
                type: "desktop",
                author: "John Doe",
                date: new Date("2024-09-28")
            },
            {
                id: 5,
                title: "REST API Framework",
                description: "Lightweight and fast REST API framework with built-in authentication, validation, and documentation.",
                type: "backend",
                author: "Sarah Wilson",
                date: new Date("2024-10-02")
            }
        ];

        let users = [
            { name: "John Doe", projectCount: 2 },
            { name: "Jane Smith", projectCount: 1 },
            { name: "Alex Johnson", projectCount: 1 },
            { name: "Sarah Wilson", projectCount: 1 }
        ];

        function toggleTheme() {
            const body = document.body;
            const toggle = document.querySelector('.toggle-switch');
            
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                toggle.classList.remove('active');
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                toggle.classList.add('active');
            }
        }

        function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const sidebar = document.querySelector('.sidebar');
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
        }

        function showSection(section) {
            document.getElementById('projects-section').style.display = 'none';
            document.getElementById('users-section').style.display = 'none';
            document.getElementById('about-section').style.display = 'none';
            
            if (section === 'projects') {
                document.getElementById('projects-section').style.display = 'block';
            } else if (section === 'users') {
                document.getElementById('users-section').style.display = 'block';
                renderUsers();
            } else if (section === 'about') {
                document.getElementById('about-section').style.display = 'block';
            }
            
            toggleMenu();
        }

        function getTypeClass(type) {
            return `type-${type}`;
        }

        function getTypeName(type) {
            const types = {
                web: 'Web Dev',
                mobile: 'Mobile',
                desktop: 'Desktop',
                backend: 'Backend',
                ai: 'AI/ML',
                other: 'Other'
            };
            return types[type] || 'Other';
        }

        function formatDate(date) {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        function renderProjects(projectsToRender) {
            const grid = document.getElementById('projectsGrid');
            
            if (projectsToRender.length === 0) {
                grid.innerHTML = '<div class="no-projects">No projects found</div>';
                return;
            }
            
            grid.innerHTML = projectsToRender.map(project => `
                <div class="project-card">
                    <div class="project-header">
                        <div>
                            <div class="project-title">${project.title}</div>
                            <div class="project-author">${project.author}</div>
                        </div>
                        <div class="project-type ${getTypeClass(project.type)}">
                            ${getTypeName(project.type)}
                        </div>
                    </div>
                    <div class="project-description">${project.description}</div>
                    <div class="project-meta">
                        <div class="project-date">${formatDate(project.date)}</div>
                    </div>
                </div>
            `).join('');
        }

        function renderUsers() {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = users.map(user => `
                <div class="user-card">
                    <div class="user-name">${user.name}</div>
                    <div class="user-projects">${user.projectCount} project${user.projectCount !== 1 ? 's' : ''}</div>
                </div>
            `).join('');
        }

        function populateUserFilter() {
            const userFilter = document.getElementById('userFilter');
            const uniqueUsers = [...new Set(projects.map(p => p.author))];
            
            userFilter.innerHTML = '<option value="">All Users</option>' + 
                uniqueUsers.map(user => `<option value="${user}">${user}</option>`).join('');
        }

        function filterProjects() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const typeFilter = document.getElementById('typeFilter').value;
            const userFilter = document.getElementById('userFilter').value;
            const dateSort = document.getElementById('dateSort').value;
            
            let filtered = projects.filter(project => {
                const matchesSearch = project.title.toLowerCase().includes(searchTerm) || 
                                    project.description.toLowerCase().includes(searchTerm);
                const matchesType = !typeFilter || project.type === typeFilter;
                const matchesUser = !userFilter || project.author === userFilter;
                
                return matchesSearch && matchesType && matchesUser;
            });
            
            filtered.sort((a, b) => {
                if (dateSort === 'newest') {
                    return b.date - a.date;
                } else {
                    return a.date - b.date;
                }
            });
            
            renderProjects(filtered);
        }

        // Initialize
        populateUserFilter();
        filterProjects();
    </script>
</body>
</html>
