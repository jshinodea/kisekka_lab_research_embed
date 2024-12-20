// Projects Embed Script
// Description: Injects a beautiful projects UI into any website
// Author: AI Agent
// Last Modified: 2023-12-20

(function() {
    // More robust ready state check for Drupal
    const whenReady = (callback) => {
        if (document.readyState !== 'loading') {
            // Handle case where script loads after DOM is ready
            setTimeout(callback, 0);
        } else {
            // Handle case where script loads before DOM is ready
            document.addEventListener('DOMContentLoaded', callback);
        }
        // Backup timeout in case DOMContentLoaded doesn't fire
        setTimeout(callback, 2000);
    };

    const init = () => {
        // Project data structure
        const projectsData = {
            "Irrigation": {
                "Sensing and modeling": [
                    { 
                        title: "Soil moisture sensing using cosmic ray and RF based sensors",
                        grant: "Sony Cooperation",
                        keywords: "soil moisture"
                    },
                    { 
                        title: "Stem water potential sensing using osmometers and microtensiometers",
                        grant: "Almond Board",
                        keywords: "stem water potential"
                    },
                    { 
                        title: "Salinity stress sensing using VOCs",
                        grant: "Sandia National Lab",
                        keywords: "salinity"
                    },
                    { 
                        title: "Soil nitrate sensing",
                        grant: "CDFA SCBG",
                        keywords: "nitrate"
                    }
                ],
                "Limited irrigation management for specialty crops": [
                    { title: "Almonds", grant: "Almond Board", keywords: "almonds" },
                    { title: "Pistachios", grant: null, keywords: "pistachios" },
                    { title: "Processing tomatoes", grant: "US-Israel BARD", keywords: "tomatoes" }
                ],
                "Limited irrigation management for field crops": [
                    { title: "Alfalfa", grant: "USDA NIFA", keywords: "alfalfa" }
                ],
                "Recycled water reuse for irrigation": [
                    { title: "Impact of recycled water reuse for irrigation on soil sodicity, salinity, and crop production", grant: "Water Research Foundation", keywords: "recycled water" }
                ]
            },
            "Hydrology": {
                "Groundwater Sustainability": [
                    { title: "Groundwater demand reduction through land-water allocation optimization", grant: "USDA NIFA", keywords: "allocation" },
                    { title: "Groundwater supply increase through early spring flood irrigation followed by microirrigation", grant: "USDA NIFA", keywords: "micro-irrigation" }
                ],
                "Soil Hydrology": [
                    { title: "Vadose zone monitoring and modeling of nitrate leaching to groundwater", grant: "USDA NRCS CEAP, AIFS", keywords: "vadose" },
                    { title: "Water and carbon cycling in pistachio orchards with and without cover crops", grant: "USDA ARS", keywords: "pistachio" }
                ],
                "Evapotranspiration measurement and modeling": [
                    { title: "Validation of remote sensing of ET of applied water (ETAW) for monitoring groundwater allocation under SGMA", grant: "USDA NIFA", keywords: "remote sensing" }
                ]
            },
            "Climate Smart Agriculture": {
                "Water management for climate-smart agriculture": [],
                "Reducing GHG emissions and sequestering carbon": []
            }
        };

        // Create and inject styles
        const styles = `
            .projects-container {
                font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 1rem;
                color: #003366;
                background: #ffffff;
            }

            .research-field {
                margin-bottom: 2.5rem;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            .research-field-header {
                display: flex;
                align-items: flex-start;
                cursor: pointer;
                user-select: none;
                position: relative;
                border-bottom: 3px solid #003366;
                margin-bottom: 2rem;
                width: 100%;
            }

            .collapse-icon {
                position: absolute;
                left: -24px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease;
                width: 16px;
                height: 16px;
                top: 63%;
                transform: translateY(-50%);
            }

            .collapse-icon::before {
                content: '';
                border: solid #003366;
                border-width: 0 2px 2px 0;
                display: inline-block;
                padding: 3px;
                transform: rotate(45deg);
                transition: transform 0.3s ease;
            }

            .research-field.collapsed .collapse-icon::before {
                transform: rotate(-45deg);
            }

            .research-field.collapsed .research-focuses-grid {
                display: none;
            }

            .research-field-title {
                color: #003366;
                font-size: 1.5rem;
                font-weight: 700;
                letter-spacing: -0.02em;
                padding-bottom: 0.5rem;
                border-bottom: 3px solid #FDB515;
                position: relative;
                transition: color 0.3s ease;
                margin-bottom: -3px;
                display: inline-block;
            }

            .research-field-subtitle {
                color: #666;
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-weight: 500;
                background: white;
                position: absolute;
                bottom: -10px;
                transform: translateY(80%);
                padding: 0 8px;
                margin-left: -8px;
                z-index: 1;
            }

            .research-focuses-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.25rem;
                transition: all 0.3s ease;
                margin-top: 1rem;
                grid-auto-flow: row;
            }

            .research-focus-wrapper {
                display: block;
            }

            .research-focus {
                background: #ffffff;
                border-radius: 8px;
                border: 1px solid rgba(0, 51, 102, 0.1);
                box-shadow: 0 2px 4px rgba(0, 51, 102, 0.05);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .research-focus-header {
                padding: 0;
                display: flex;
                align-items: stretch;
                background: #003366;
                margin: 0.75rem 0;
            }

            .research-focus-accent {
                width: 4px;
                background: #FDB515;
                border-radius: 0;
                margin: 0;
            }

            .research-focus-title {
                color: white;
                font-size: 1.125rem;
                font-weight: 600;
                margin: 0;
                line-height: 1.3;
                padding: 1.25rem;
                flex-grow: 1;
            }

            .projects-section {
                padding: 0 1.25rem;
                position: relative;
                display: flex;
                gap: 1.25rem;
                flex: 1;
                margin-bottom: 0.75rem;
                min-height: 0;
            }

            .projects-title {
                writing-mode: vertical-lr;
                transform: rotate(180deg);
                text-transform: uppercase;
                color: #003366;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.1em;
                padding: 0.75rem 0;
                display: flex;
                align-items: center;
                position: relative;
                opacity: 0.7;
                margin-top: -0.5rem;
            }

            .projects-title::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: -0.75rem;
                width: 2px;
                background: #FDB515;
                opacity: 0.5;
            }

            .projects-list {
                display: flex;
                flex-direction: column;
                gap: 0.625rem;
                flex-grow: 1;
                min-height: 0;
            }

            .project-item {
                padding: 0.875rem 1rem;
                background: #f8f9fa;
                border-radius: 6px;
                border: 1px solid rgba(0, 51, 102, 0.08);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }

            .project-item:last-child {
                margin-bottom: 0;
            }

            .project-item:hover {
                transform: translateX(4px);
                background: white;
                border-color: #FDB515;
                box-shadow: 0 2px 4px rgba(0, 51, 102, 0.08);
            }

            .project-title {
                font-size: 0.875rem;
                font-weight: 500;
                color: #003366;
                line-height: 1.4;
                margin-bottom: 0.25rem;
            }

            .project-grant {
                font-size: 0.75rem;
                color: #666;
                font-style: italic;
                padding: 0.25rem 0.5rem;
                background: rgba(0, 51, 102, 0.05);
                border-radius: 4px;
                display: inline-block;
            }

            @media (max-width: 1200px) {
                .research-focuses-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 768px) {
                .collapse-icon {
                    left: -20px;
                }

                .research-field-title {
                    font-size: 1.25rem;
                }

                .research-focuses-grid {
                    grid-template-columns: 1fr;
                }
            }

            .research-focus.span-2 {
                grid-column: span 2;
            }

            .research-focus.span-1 {
                grid-column: span 1;
            }
        `;

        // Ensure styles are injected only once
        if (!document.querySelector('style[data-embed="projects"]')) {
            const styleSheet = document.createElement("style");
            styleSheet.setAttribute('data-embed', 'projects');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        // Add publications popup script if not already present
        if (!document.querySelector('script[src*="publications-embed.onrender.com"]')) {
            const popupScript = document.createElement("script");
            popupScript.src = "https://publications-embed.onrender.com/popup-embed.js";
            document.head.appendChild(popupScript);
        }

        // Create main container
        const container = document.createElement("div");
        container.className = "projects-container";

        // Generate HTML for projects
        Object.entries(projectsData).forEach(([field, focuses]) => {
            const fieldDiv = document.createElement("div");
            fieldDiv.className = "research-field";
            
            // Create header with collapse functionality
            const fieldHeader = document.createElement("div");
            fieldHeader.className = "research-field-header";
            
            const collapseIcon = document.createElement("div");
            collapseIcon.className = "collapse-icon";
            collapseIcon.innerHTML = ''; // Clear any existing content
            
            const fieldTitle = document.createElement("h2");
            fieldTitle.className = "research-field-title";
            fieldTitle.textContent = field;
            
            // Add research focuses subtitle
            const subtitle = document.createElement("div");
            subtitle.className = "research-field-subtitle";
            subtitle.textContent = "Research Focuses";
            
            fieldHeader.appendChild(collapseIcon);
            fieldHeader.appendChild(fieldTitle);
            fieldHeader.appendChild(subtitle);
            fieldDiv.appendChild(fieldHeader);

            // Add click handler for collapse
            fieldHeader.addEventListener('click', (e) => {
                // Prevent click from triggering on child elements
                if (e.target === fieldHeader || e.target === fieldTitle || e.target === collapseIcon) {
                    fieldDiv.classList.toggle('collapsed');
                }
            });

            // Create grid for research focuses
            const focusesGrid = document.createElement("div");
            focusesGrid.className = "research-focuses-grid";

            // Helper function to estimate card height based on content
            const estimateCardHeight = (projects) => {
                const headerHeight = 80; // Header + margins
                const projectHeight = 70; // Height per project + margins
                return headerHeight + (projects.length * projectHeight);
            };

            // Helper function to calculate column height
            const calculateColumnHeight = (cards) => {
                return cards.reduce((sum, card) => sum + card.height, 0);
            };

            // Optimize card placement for minimum height
            const optimizeCardPlacement = (focuses) => {
                const focusEntries = Object.entries(focuses);
                if (focusEntries.length <= 3) return focusEntries;

                // Calculate heights for each card
                const cards = focusEntries.map(([focus, projects]) => ({
                    focus,
                    projects,
                    height: estimateCardHeight(projects)
                }));

                // Sort cards by height in descending order
                cards.sort((a, b) => b.height - a.height);

                // Initialize columns
                const columns = [[], [], []];
                let columnHeights = [0, 0, 0];

                // Place each card in the column that results in the minimum max height
                cards.forEach(card => {
                    let bestColumn = 0;
                    let minMaxHeight = Infinity;

                    // Try placing the card in each column
                    for (let i = 0; i < 3; i++) {
                        const newHeight = columnHeights[i] + card.height;
                        const potentialHeights = [...columnHeights];
                        potentialHeights[i] = newHeight;
                        const maxHeight = Math.max(...potentialHeights);

                        if (maxHeight < minMaxHeight) {
                            minMaxHeight = maxHeight;
                            bestColumn = i;
                        }
                    }

                    // Place the card in the best column
                    columns[bestColumn].push(card);
                    columnHeights[bestColumn] += card.height;
                });

                // Convert back to focus entries format
                return columns.flat().map(card => [card.focus, card.projects]);
            };

            // Get optimized card arrangement
            const optimizedFocuses = optimizeCardPlacement(focuses);
            
            // Create a document fragment to hold all cards
            const fragment = document.createDocumentFragment();
            
            // Create and append cards in optimized order
            optimizedFocuses.forEach(([focus, projects]) => {
                const wrapperDiv = document.createElement("div");
                wrapperDiv.className = "research-focus-wrapper";

                const focusDiv = document.createElement("div");
                focusDiv.className = "research-focus";

                // Create header section
                const headerDiv = document.createElement("div");
                headerDiv.className = "research-focus-header";
                
                const focusAccent = document.createElement("div");
                focusAccent.className = "research-focus-accent";
                
                const focusTitle = document.createElement("h3");
                focusTitle.className = "research-focus-title";
                focusTitle.textContent = focus;
                
                headerDiv.appendChild(focusAccent);
                headerDiv.appendChild(focusTitle);
                focusDiv.appendChild(headerDiv);

                // Create projects section
                const projectsSection = document.createElement("div");
                projectsSection.className = "projects-section";

                // Only show projects title if there are projects
                if (projects.length > 0) {
                    const projectsTitle = document.createElement("div");
                    projectsTitle.className = "projects-title";
                    projectsTitle.textContent = "Projects";
                    projectsSection.appendChild(projectsTitle);
                }

                const projectsList = document.createElement("div");
                projectsList.className = "projects-list";

                projects.forEach(project => {
                    const projectDiv = document.createElement("div");
                    projectDiv.className = "project-item";
                    projectDiv.setAttribute("data-publications-search", project.keywords || project.title);

                    const projectTitle = document.createElement("div");
                    projectTitle.className = "project-title";
                    projectTitle.textContent = project.title;
                    projectDiv.appendChild(projectTitle);

                    if (project.grant) {
                        const projectGrant = document.createElement("div");
                        projectGrant.className = "project-grant";
                        projectGrant.textContent = project.grant;
                        projectDiv.appendChild(projectGrant);
                    }

                    projectsList.appendChild(projectDiv);
                });

                projectsSection.appendChild(projectsList);
                focusDiv.appendChild(projectsSection);
                wrapperDiv.appendChild(focusDiv);
                fragment.appendChild(wrapperDiv);
            });

            // Append all cards at once
            focusesGrid.appendChild(fragment);

            fieldDiv.appendChild(focusesGrid);
            container.appendChild(fieldDiv);
        });

        // Find or create target element with more specific targeting
        let targetElement = document.getElementById('projects-embed');
        if (!targetElement) {
            // Try to find a suitable container in Drupal context
            targetElement = document.querySelector('.field--name-body') || 
                          document.querySelector('main') ||
                          document.querySelector('.main-content');
            
            if (targetElement) {
                // Create and insert our embed container
                const embedDiv = document.createElement('div');
                embedDiv.id = 'projects-embed';
                targetElement.appendChild(embedDiv);
                targetElement = embedDiv;
            } else {
                // Fallback to body if no suitable container found
                targetElement = document.createElement('div');
                targetElement.id = 'projects-embed';
                document.body.appendChild(targetElement);
            }
        }

        // Clear existing content if any
        targetElement.innerHTML = '';
        
        // Inject the container
        targetElement.appendChild(container);

        // Log success for debugging
        console.log('Projects embed initialized successfully');
    };

    // Initialize with better error handling
    try {
        whenReady(() => {
            try {
                init();
            } catch (e) {
                console.error('Error initializing projects embed:', e);
            }
        });
    } catch (e) {
        console.error('Error in projects embed setup:', e);
    }
})(); 