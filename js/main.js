window.addEventListener('load', (event) =>
{
    let code_tab_headers = document.querySelectorAll('[data-code-tab-header]');
    for (let element of code_tab_headers)
    {
        element.addEventListener('click', (event) =>
        {
            let selected_tab = event.target.getAttribute('data-code-tab-header');
            let code_section = element.closest('.code-section');
            let headers = code_section.querySelectorAll('[data-code-tab-header]');
            for(let header of headers)
            {
                header.classList.remove('active');
            }
            let tabs = code_section.querySelectorAll('[data-code-tab]');
            for(let tab of tabs)
            {
                tab.classList.remove('active');
            }

            code_section.querySelector(`[data-code-tab-header='${selected_tab}']`).classList.add('active');
            code_section.querySelector(`[data-code-tab='${selected_tab}']`).classList.add('active');
        });
    }

    let submit_buttons = document.querySelectorAll('.submit-test');
    for (let element of submit_buttons)
    {
        element.addEventListener('click', (event) =>
        {
            let iframe = document.querySelector(`[name='${element.form.target}']`);
            let code_section = iframe.closest('.code-section');
            code_section.querySelector('[data-code-tab-header=data]').click();
        });
    }
});