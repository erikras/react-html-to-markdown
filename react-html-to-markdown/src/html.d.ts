declare namespace JSX {
  interface IntrinsicElements {
    // Document metadata
    head: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadElement>,
      HTMLHeadElement
    >
    title: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTitleElement>,
      HTMLTitleElement
    >
    base: React.DetailedHTMLProps<
      React.BaseHTMLAttributes<HTMLBaseElement>,
      HTMLBaseElement
    >
    link: React.DetailedHTMLProps<
      React.LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement
    >
    meta: React.DetailedHTMLProps<
      React.MetaHTMLAttributes<HTMLMetaElement>,
      HTMLMetaElement
    >
    style: React.DetailedHTMLProps<
      React.StyleHTMLAttributes<HTMLStyleElement>,
      HTMLStyleElement
    >

    // Content sectioning
    body: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLBodyElement>,
      HTMLBodyElement
    >
    article: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    section: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    aside: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    h1: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    h2: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    h3: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    h4: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    h5: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    h6: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
    header: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    footer: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    address: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    main: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >

    // Text content
    p: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >
    hr: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHRElement>,
      HTMLHRElement
    >
    pre: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
    blockquote: React.DetailedHTMLProps<
      React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
      HTMLQuoteElement
    >
    ol: React.DetailedHTMLProps<
      React.OlHTMLAttributes<HTMLOListElement>,
      HTMLOListElement
    >
    ul: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >
    li: React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >
    dl: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDListElement>,
      HTMLDListElement
    >
    dt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    dd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    figure: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    figcaption: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    div: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >

    // Inline text semantics
    a: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
    em: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    strong: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    small: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    s: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    cite: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    q: React.DetailedHTMLProps<
      React.QuoteHTMLAttributes<HTMLQuoteElement>,
      HTMLQuoteElement
    >
    dfn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    abbr: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    ruby: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    rb: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    rt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    rtc: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    rp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    time: React.DetailedHTMLProps<
      React.TimeHTMLAttributes<HTMLTimeElement>,
      HTMLTimeElement
    >
    code: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    var: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    samp: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    kbd: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    sub: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    sup: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    i: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    b: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    u: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    mark: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    bdi: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    bdo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    span: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >
    br: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLBRElement>,
      HTMLBRElement
    >
    wbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

    // Image and multimedia
    img: React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
    audio: React.DetailedHTMLProps<
      React.AudioHTMLAttributes<HTMLAudioElement>,
      HTMLAudioElement
    >
    video: React.DetailedHTMLProps<
      React.VideoHTMLAttributes<HTMLVideoElement>,
      HTMLVideoElement
    >
    source: React.DetailedHTMLProps<
      React.SourceHTMLAttributes<HTMLSourceElement>,
      HTMLSourceElement
    >
    track: React.DetailedHTMLProps<
      React.TrackHTMLAttributes<HTMLTrackElement>,
      HTMLTrackElement
    >
    map: React.DetailedHTMLProps<
      React.MapHTMLAttributes<HTMLMapElement>,
      HTMLMapElement
    >
    area: React.DetailedHTMLProps<
      React.AreaHTMLAttributes<HTMLAreaElement>,
      HTMLAreaElement
    >

    // Embedded content
    iframe: React.DetailedHTMLProps<
      React.IframeHTMLAttributes<HTMLIFrameElement>,
      HTMLIFrameElement
    >
    embed: React.DetailedHTMLProps<
      React.EmbedHTMLAttributes<HTMLEmbedElement>,
      HTMLEmbedElement
    >
    object: React.DetailedHTMLProps<
      React.ObjectHTMLAttributes<HTMLObjectElement>,
      HTMLObjectElement
    >
    param: React.DetailedHTMLProps<
      React.ParamHTMLAttributes<HTMLParamElement>,
      HTMLParamElement
    >
    picture: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >

    // Scripting
    canvas: React.DetailedHTMLProps<
      React.CanvasHTMLAttributes<HTMLCanvasElement>,
      HTMLCanvasElement
    >
    noscript: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    script: React.DetailedHTMLProps<
      React.ScriptHTMLAttributes<HTMLScriptElement>,
      HTMLScriptElement
    >

    // Demarcating edits
    del: React.DetailedHTMLProps<
      React.DelHTMLAttributes<HTMLModElement>,
      HTMLModElement
    >
    ins: React.DetailedHTMLProps<
      React.InsHTMLAttributes<HTMLModElement>,
      HTMLModElement
    >

    // Table content
    table: React.DetailedHTMLProps<
      React.TableHTMLAttributes<HTMLTableElement>,
      HTMLTableElement
    >
    caption: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    colgroup: React.DetailedHTMLProps<
      React.ColgroupHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement
    >
    col: React.DetailedHTMLProps<
      React.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement
    >
    thead: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >
    tbody: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >
    tfoot: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >
    tr: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableRowElement>,
      HTMLTableRowElement
    >
    td: React.DetailedHTMLProps<
      React.TdHTMLAttributes<HTMLTableDataCellElement>,
      HTMLTableDataCellElement
    >
    th: React.DetailedHTMLProps<
      React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
      HTMLTableHeaderCellElement
    >

    // Forms
    form: React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >
    label: React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >
    input: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
    button: React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
    select: React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >
    datalist: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDataListElement>,
      HTMLDataListElement
    >
    optgroup: React.DetailedHTMLProps<
      React.OptgroupHTMLAttributes<HTMLOptGroupElement>,
      HTMLOptGroupElement
    >
    option: React.DetailedHTMLProps<
      React.OptionHTMLAttributes<HTMLOptionElement>,
      HTMLOptionElement
    >
    textarea: React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
    output: React.DetailedHTMLProps<
      React.OutputHTMLAttributes<HTMLOutputElement>,
      HTMLOutputElement
    >
    progress: React.DetailedHTMLProps<
      React.ProgressHTMLAttributes<HTMLProgressElement>,
      HTMLProgressElement
    >
    meter: React.DetailedHTMLProps<
      React.MeterHTMLAttributes<HTMLMeterElement>,
      HTMLMeterElement
    >
    fieldset: React.DetailedHTMLProps<
      React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
      HTMLFieldSetElement
    >
    legend: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLLegendElement>,
      HTMLLegendElement
    >

    // Interactive elements
    details: React.DetailedHTMLProps<
      React.DetailsHTMLAttributes<HTMLDetailsElement>,
      HTMLDetailsElement
    >
    summary: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
    dialog: React.DetailedHTMLProps<
      React.DialogHTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    >

    // Web Components
    slot: React.DetailedHTMLProps<
      React.SlotHTMLAttributes<HTMLSlotElement>,
      HTMLSlotElement
    >
    template: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTemplateElement>,
      HTMLTemplateElement
    >
  }
}
