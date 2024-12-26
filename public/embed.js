// Projects Embed Script
// Description: Injects a beautiful projects UI into any website
// Author: AI Agent
// Last Modified: 2023-12-20

(function() {
    // Wait for DOM to be ready
    const init = () => {
        // Project data structure
        const projectsData = {
            "Irrigation": {
                "Sensing and modeling": [
                    { 
                        title: "Soil moisture sensing and modeling using cosmic ray, NMR, RF, TDR, capacitance, and remote sensing",
                        grant: "Sony Cooperation, USDA NIFA",
                        keywords: "soil moisture"
                    },
                    { 
                        title: "Plant water status sensing and modeling",
                        grant: "Almond Board",
                        keywords: "stem water potential"
                    },
                    { 
                        title: "Irrigation modeling",
                        grant: "Sandia National Lab, USDA NIFA, NRCS",
                        keywords: "modeling"
                    },
                    { 
                        title: "Soil nitrate sensing",
                        grant: "CDFA SCBG, USDA NRCS, AIFS",
                        keywords: "nitrate"
                    }
                ],
                "Water-limited irrigation management for specialty crops": [
                    { title: "Almonds", grant: "Almond Board", keywords: "almond" },
                    { title: "Pistachios", grant: "CDFA SCBG", keywords: "pistachio" },
                    { title: "Processing tomatoes", grant: "US-Israel BARD, USDA NIFA, NRCS", keywords: "tomato" }
                ],
                "Water-limited irrigation management for field crops": [
                    { title: "Alfalfa", grant: "USDA NIFA", keywords: "alfalfa" },
                    { title: "Corn / Maize", grant: "USDA ARS Ogallala OAP, KCM", keywords: "corn, maize" },
                    { title: "Sorghum", grant: "USDA ARS Ogallala OAP, KGSC", keywords: "sorghum" }
                ]
            },
            "Hydrology": {
                "Groundwater Sustainability": [
                    { title: "Groundwater Demand Management", grant: "USDA NIFA", keywords: "optimizing land and water allocation" },
                    { title: "Conservation practices for mitigating groundwater nitrate contamination", grant: "USDA NRCS CEAP, CDFA FREP", keywords: "nitrate leach" }
                ],
                "Soil Hydrology": [
                    { title: "Vadose zone monitoring and modeling of nitrate leaching to groundwater", grant: "USDA NRCS CEAP, AIFS, CDFA FREP", keywords: "vadose" },
                    { title: "Salinity management", grant: "USDA NIFA, ARS", keywords: "Assessing the State of Knowledge, Assessing the impact of recycled water reuse on infiltration and soil structure, salin" }
                    
                ],
                "Evapotranspiration measurement and modeling": [
                    { title: "Remote sensing of ET, ground-based measurement of ET, and agrohydrologic modeling of ET towards optimized water use in Ag", grant: "USDA NIFA, CDFA SCBG", keywords: "remote sensing, evapotranspiration" }
                ]
            },
            "Climate Smart Agriculture": {
                "Water management impacts on soil health": [
                    { title: "Impact of recycled water reuse for irrigation on soil sodicity, salinity, and crop production", grant: "Water Research Foundation, USDA NIFA, ARS", keywords: "recycled water" }
                ],
                "Reducing GHG emissions and sequestering carbon": [
                    { title: "Water and carbon cycling in pistachio orchards with and without cover crops", grant: "USDA NIFA, ARS", keywords: "pistachio" }
                ]
            }
        };

        // Create and inject styles
        const styles = `
            .projects-container {
                font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1rem;
                color: #003366;
                background: #ffffff;
                line-height: 0;
            }

            .research-field {
                margin-bottom: 2rem;
                display: flex;
                flex-direction: column;
                position: relative;
                line-height: normal;
            }

            .research-field:first-child {
                margin-top: 0;
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
                margin-top: 0;
                padding-top: 0;
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
                top: 43%;
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
                margin: 0;
                border-bottom: 3px solid #FDB515;
                position: relative;
                transition: color 0.3s ease;
                margin-bottom: -3px;
                display: inline-block;
                line-height: 1.2;
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
                grid-auto-flow: dense;
            }

            .research-focus-wrapper {
                display: block;
            }

            /* Default 3-column layout */
            .research-field[data-field] .research-focus-wrapper[data-column="1"] {
                grid-column: 1;
            }
            .research-field[data-field] .research-focus-wrapper[data-column="2"] {
                grid-column: 2;
            }
            .research-field[data-field] .research-focus-wrapper[data-column="3"] {
                grid-column: 3;
            }

            /* 2-column layout for medium screens */
            @media (max-width: 1024px) {
                .research-focuses-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .research-field[data-field] .research-focus-wrapper[data-column="1"] {
                    grid-column: 1;
                }
                .research-field[data-field] .research-focus-wrapper[data-column="2"],
                .research-field[data-field] .research-focus-wrapper[data-column="3"] {
                    grid-column: 2;
                }
            }

            /* 1-column layout for small screens */
            @media (max-width: 768px) {
                .research-focuses-grid {
                    grid-template-columns: 1fr;
                }

                .research-field[data-field] .research-focus-wrapper[data-column] {
                    grid-column: 1;
                }
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

        // Create style element
        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        // Add publications popup script
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
            fieldDiv.setAttribute("data-field", field);  // Add field identifier
            
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

            // Modify the optimizeCardPlacement function to handle different fields
            const getColumnOrder = (field, screenWidth = window.innerWidth) => {
                // Base column orders
                const baseColumnOrders = {
                    "Irrigation": {
                        "Sensing and modeling": 1,
                        "Recycled water reuse for irrigation": 1,
                        "Water-limited irrigation management for specialty crops": 2,
                        "Water-limited irrigation management for field crops": 3
                    },
                    "Hydrology": {
                        "Groundwater Sustainability": 1,
                        "Soil Hydrology": 2,
                        "Evapotranspiration measurement and modeling": 3
                    },
                    "Climate Smart Agriculture": {
                        "Water management for climate-smart agriculture": 1,
                        "Reducing GHG emissions and sequestering carbon": 2
                    }
                };

                // Adjust column assignments based on screen width
                const columnOrder = { ...baseColumnOrders[field] };
                
                if (screenWidth <= 768) {
                    // Single column - all items in column 1
                    Object.keys(columnOrder).forEach(key => {
                        columnOrder[key] = 1;
                    });
                } else if (screenWidth <= 1024) {
                    // Two columns - redistribute items
                    Object.keys(columnOrder).forEach(key => {
                        if (columnOrder[key] > 2) {
                            columnOrder[key] = 2;
                        }
                    });
                }

                return columnOrder || {};
            };

            const optimizeCardPlacement = (focuses, field) => {
                const focusEntries = Object.entries(focuses);
                const columnOrder = getColumnOrder(field);
                
                // Sort entries based on column order
                focusEntries.sort((a, b) => {
                    const aCol = columnOrder[a[0]] ?? 999;
                    const bCol = columnOrder[b[0]] ?? 999;
                    if (aCol === bCol) {
                        return focusEntries.indexOf(a) - focusEntries.indexOf(b);
                    }
                    return aCol - bCol;
                });

                return focusEntries.map(entry => ({
                    focus: entry[0],
                    projects: entry[1],
                    column: columnOrder[entry[0]] || 1
                }));
            };

            // Get optimized card arrangement
            const optimizedFocuses = optimizeCardPlacement(focuses, field);
            
            // Create a document fragment to hold all cards
            const fragment = document.createDocumentFragment();
            
            // Create and append cards in optimized order
            optimizedFocuses.forEach(({ focus, projects, column }) => {
                const wrapperDiv = document.createElement("div");
                wrapperDiv.className = "research-focus-wrapper";
                wrapperDiv.setAttribute("data-column", column);

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

        // Find or create target element
        let targetElement = document.getElementById('projects-embed');
        if (!targetElement) {
            targetElement = document.createElement('div');
            targetElement.id = 'projects-embed';
            document.body.appendChild(targetElement);
        }

        // Inject the container
        targetElement.appendChild(container);

        // Add resize handler to update layout
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const grids = document.querySelectorAll('.research-focuses-grid');
                grids.forEach(grid => {
                    const field = grid.closest('.research-field').getAttribute('data-field');
                    const focuses = projectsData[field];
                    const optimizedFocuses = optimizeCardPlacement(focuses, field);
                    
                    // Update column assignments
                    grid.querySelectorAll('.research-focus-wrapper').forEach((wrapper, index) => {
                        wrapper.setAttribute('data-column', optimizedFocuses[index].column);
                    });
                });
            }, 250); // Debounce resize events
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(); 