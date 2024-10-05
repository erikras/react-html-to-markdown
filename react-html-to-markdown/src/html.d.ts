declare namespace JSX {
  // Define a type for elements that can have children
  type ElementWithChildren<T> = {
    [key: string]: any // This allows for any string attributes
    children?: React.ReactNode
  }

  interface IntrinsicElements {
    // Document metadata
    head: ElementWithChildren<HTMLHeadElement>
    title: ElementWithChildren<HTMLTitleElement>
    base: ElementWithChildren<HTMLBaseElement>
    link: ElementWithChildren<HTMLLinkElement>
    meta: ElementWithChildren<HTMLMetaElement>
    style: ElementWithChildren<HTMLStyleElement>

    // Content sectioning
    body: ElementWithChildren<HTMLBodyElement>
    article: ElementWithChildren<HTMLElement>
    section: ElementWithChildren<HTMLElement>
    nav: ElementWithChildren<HTMLElement>
    aside: ElementWithChildren<HTMLElement>
    h1: ElementWithChildren<HTMLHeadingElement>
    h2: ElementWithChildren<HTMLHeadingElement>
    h3: ElementWithChildren<HTMLHeadingElement>
    h4: ElementWithChildren<HTMLHeadingElement>
    h5: ElementWithChildren<HTMLHeadingElement>
    h6: ElementWithChildren<HTMLHeadingElement>
    header: ElementWithChildren<HTMLElement>
    footer: ElementWithChildren<HTMLElement>
    address: ElementWithChildren<HTMLElement>
    main: ElementWithChildren<HTMLElement>

    // Text content
    p: ElementWithChildren<HTMLParagraphElement>
    hr: ElementWithChildren<HTMLHRElement>
    pre: ElementWithChildren<HTMLPreElement>
    blockquote: ElementWithChildren<HTMLQuoteElement>
    ol: ElementWithChildren<HTMLOListElement>
    ul: ElementWithChildren<HTMLUListElement>
    li: ElementWithChildren<HTMLLIElement>
    dl: ElementWithChildren<HTMLDListElement>
    dt: ElementWithChildren<HTMLElement>
    dd: ElementWithChildren<HTMLElement>
    figure: ElementWithChildren<HTMLElement>
    figcaption: ElementWithChildren<HTMLElement>
    div: ElementWithChildren<HTMLDivElement>

    // Inline text semantics
    a: ElementWithChildren<HTMLAnchorElement>
    em: ElementWithChildren<HTMLElement>
    strong: ElementWithChildren<HTMLElement>
    small: ElementWithChildren<HTMLElement>
    s: ElementWithChildren<HTMLElement>
    cite: ElementWithChildren<HTMLElement>
    q: ElementWithChildren<HTMLQuoteElement>
    dfn: ElementWithChildren<HTMLElement>
    abbr: ElementWithChildren<HTMLElement>
    ruby: ElementWithChildren<HTMLElement>
    rb: ElementWithChildren<HTMLElement>
    rt: ElementWithChildren<HTMLElement>
    rtc: ElementWithChildren<HTMLElement>
    rp: ElementWithChildren<HTMLElement>
    time: ElementWithChildren<HTMLTimeElement>
    code: ElementWithChildren<HTMLElement>
    var: ElementWithChildren<HTMLElement>
    samp: ElementWithChildren<HTMLElement>
    kbd: ElementWithChildren<HTMLElement>
    sub: ElementWithChildren<HTMLElement>
    sup: ElementWithChildren<HTMLElement>
    i: ElementWithChildren<HTMLElement>
    b: ElementWithChildren<HTMLElement>
    u: ElementWithChildren<HTMLElement>
    mark: ElementWithChildren<HTMLElement>
    bdi: ElementWithChildren<HTMLElement>
    bdo: ElementWithChildren<HTMLElement>
    span: ElementWithChildren<HTMLSpanElement>
    br: ElementWithChildren<HTMLBRElement>
    wbr: ElementWithChildren<HTMLElement>

    // Image and multimedia
    img: ElementWithChildren<HTMLImageElement>
    audio: ElementWithChildren<HTMLAudioElement>
    video: ElementWithChildren<HTMLVideoElement>
    source: ElementWithChildren<HTMLSourceElement>
    track: ElementWithChildren<HTMLTrackElement>
    map: ElementWithChildren<HTMLMapElement>
    area: ElementWithChildren<HTMLAreaElement>

    // Embedded content
    iframe: ElementWithChildren<HTMLIFrameElement>
    embed: ElementWithChildren<HTMLEmbedElement>
    object: ElementWithChildren<HTMLObjectElement>
    param: ElementWithChildren<HTMLParamElement>
    picture: ElementWithChildren<HTMLElement>

    // Scripting
    canvas: ElementWithChildren<HTMLCanvasElement>
    noscript: ElementWithChildren<HTMLElement>
    script: ElementWithChildren<HTMLScriptElement>

    // Demarcating edits
    del: ElementWithChildren<HTMLModElement>
    ins: ElementWithChildren<HTMLModElement>

    // Table content
    table: ElementWithChildren<HTMLTableElement>
    caption: ElementWithChildren<HTMLElement>
    colgroup: ElementWithChildren<HTMLTableColElement>
    col: ElementWithChildren<HTMLTableColElement>
    thead: ElementWithChildren<HTMLTableSectionElement>
    tbody: ElementWithChildren<HTMLTableSectionElement>
    tfoot: ElementWithChildren<HTMLTableSectionElement>
    tr: ElementWithChildren<HTMLTableRowElement>
    td: ElementWithChildren<HTMLTableDataCellElement>
    th: ElementWithChildren<HTMLTableHeaderCellElement>

    // Forms
    form: ElementWithChildren<HTMLFormElement>
    label: ElementWithChildren<HTMLLabelElement>
    input: ElementWithChildren<HTMLInputElement>
    button: ElementWithChildren<HTMLButtonElement>
    select: ElementWithChildren<HTMLSelectElement>
    datalist: ElementWithChildren<HTMLDataListElement>
    optgroup: ElementWithChildren<HTMLOptGroupElement>
    option: ElementWithChildren<HTMLOptionElement>
    textarea: ElementWithChildren<HTMLTextAreaElement>
    output: ElementWithChildren<HTMLOutputElement>
    progress: ElementWithChildren<HTMLProgressElement>
    meter: ElementWithChildren<HTMLMeterElement>
    fieldset: ElementWithChildren<HTMLFieldSetElement>
    legend: ElementWithChildren<HTMLLegendElement>

    // Interactive elements
    details: ElementWithChildren<HTMLDetailsElement>
    summary: ElementWithChildren<HTMLElement>
    dialog: ElementWithChildren<HTMLDialogElement>

    // Web Components
    slot: ElementWithChildren<HTMLSlotElement>
    template: ElementWithChildren<HTMLTemplateElement>
  }
}
