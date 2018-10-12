
procedure Tfrm_UpdateInventory.DoTheWork;
var

  artist_dates, art_work, art_work2,
    ppDBTextUNFRAMED_HEIGHT, ppDBTextUNFRAMED_HEIGHT16,
    ppDBTextUNFRAMED_WIDTH, ppDBTextUNFRAMED_WIDTH16,
    ppDBTextUNFRAMED_DEPTH, ppDBTextUNFRAMED_DEPTH16, ppUnframed_Dimensions,
    exh, repo, repo2, repo3, prov: string;
   // prp: TParProps;
  i: Integer;
  ATITLEYEAR, details, size, medium, ATITLE, HREPO, ATAB, html, aname, s, HART, HTITLE, HDETAILS, HMEDIUM, HDATE, HSIZE, HPROV, HEXHIB: string;
  Save_Cursor: TCursor;
  only1: boolean;
  fontSize: integer;

begin
showmessage('do it ');
artist_dates:=''; art_work:=''; art_work2:='';
    ppDBTextUNFRAMED_HEIGHT:=''; ppDBTextUNFRAMED_HEIGHT16:='';
    ppDBTextUNFRAMED_WIDTH:=''; ppDBTextUNFRAMED_WIDTH16:='';
    ppDBTextUNFRAMED_DEPTH:=''; ppDBTextUNFRAMED_DEPTH16:=''; ppUnframed_Dimensions:='';
    exh:=''; repo:=''; repo2:=''; repo3:=''; prov:='';
  ATITLEYEAR:=''; details:='';size:=''; medium:='';ATITLE:='';HREPO:=''; ATAB:='';html:='';aname:='';s:='';HART:=''; HTITLE:='';
  HDETAILS:='';HMEDIUM:='';HDATE:='';HSIZE:='';HPROV:='';HEXHIB:='';


  case FormatType of
    gtzFmtLabel, gtzFmtFact, gtzFmtBuild:
      begin
        artist_name := frmInv.qInv.fieldbyname('Artist').AsString + '';
        aname := frmInv.qInv.fieldbyname('Artist').AsString;
      end;
    gtzFmtRegistra:
      begin
        artist_name :=  frmInv.qInv.fieldbyname('Artist Registra').AsString + '';
        aname := frmInv.qInv.fieldbyname('Artist Registra').AsString;
      end;
  end; 

  if frmInv.qInv.fieldbyname('Died').AsString <> '' then
    artist_dates := ' (' + frmInv.qInv.fieldbyname('Year of Birth').AsString + '-' +
      frmInv.qInv.fieldbyname('Died').AsString + ')'
  else
    if frmInv.qInv.fieldbyname('Year of Birth').AsString <> '' then
      artist_dates := ' (b.' + frmInv.qInv.fieldbyname('Year of Birth').AsString + ')';

  artist_name := artist_name + artist_dates + '</p>';
  aname := aname + artist_dates;

  ATITLE := '<i>' + frmInv.qInv.fieldbyname('Title').AsString + '</i>';
  ATITLEYEAR := ATITLE + ', ' + frmInv.qInv.fieldbyname('Inv Year').AsString;
   art_work2 := '';

  if frmInv.lcbMediumSupport.Text <> '' then
    medium := frmInv.lcbMediumSupport.Text;

  if (frmInv.qInv.FieldByName('Signed').asstring <> 'Y') and
    (frmInv.qInv.FieldByName('Dated Location').asstring <> '') then
  begin
    details := '<p>signed and dated</p>';
    details := details + '<p>' + frmInv.qInv.FieldByName('Signed Location').asstring + '</p>';
    details := details + '<p>' + frmInv.qInv.FieldByName('Dated Location').asstring + '</p>';

  end else
  begin
    if frmInv.qInv.FieldByName('Signed Location').asstring <> '' then
      details := '<p>' + frmInv.qInv.FieldByName('Signed Location').asstring + '</p>';
    if frmInv.qInv.FieldByName('Dated Location').asstring <> '' then
      details := details + '<p>' + frmInv.qInv.FieldByName('Dated Location').asstring + '</p>';
  end;

  artist_name := TRIM(artist_name);

  HART := ''; HTITLE := ''; HDATE := ''; HMEDIUM := ''; HSIZE := ''; HPROV := ''; HEXHIB := '';
  case FormatType of
    gtzFmtLabel:
      begin
      showmessage('do it gtzFmtLabel ');
        HART := ''; HTITLE := ''; HDATE := ''; HMEDIUM := ''; HSIZE := ''; HPROV := ''; HEXHIB := '';
        artist_name := artist_name + '<p>' + TRIM(ATITLEYEAR) + '</p>';
        artist_name := artist_name + '<p>' + TRIM(medium) + '</p>';


     
      end;
    gtzFmtRegistra:
      begin
        HART := ''; HTITLE := ''; HDATE := ''; HMEDIUM := ''; HSIZE := ''; HPROV := ''; HEXHIB := '';
        artist_name := artist_name + art_work;
      end;
    gtzFmtFact:
      begin
        artist_name := ''; // reset diff than label
       artist_name := 'ARTIST: ' + trim(aname) + '</p>';
        artist_name := artist_name + '<p>TITLE: '  + trim(ATITLE) + '</p>';
        if frmInv.qInv.fieldbyname('Inv Year').AsString <> '' then
          artist_name := artist_name + '<p>DATE: ' + frmInv.qInv.fieldbyname('Inv Year').AsString + '</p>';
         artist_name := artist_name + '<p>MEDIUM: ' + ATAB + ATAB + ATAB + ATAB + medium + '</p>';
        HPROV := '<p>PROVENANCE:' + ATAB + ATAB + ATAB + ATAB; //+'</p>'
        HEXHIB := '<p>EXHIBITION HISTORY: ' + ATAB + ATAB + ATAB + ATAB + '</p>';
        HDETAILS := '<p>DETAILS: ' + ATAB + ATAB + ATAB + ATAB + '</p>';
        HREPO := '<p>REPRODUCTION HISTORY: ' + ATAB + ATAB + ATAB + ATAB; //+'</p>';
      end;
  end;

  memo.Clear; memo2.clear;
  if not (frmInv.qInv.fieldbyname('Framed Height').asstring = '0') and
    (frmInv.qInv.fieldbyname('Unframed Height').asstring = '0') and
    (frmInv.qInv.fieldbyname('Sight Height').asstring = '0') then
    only1 := true // has only a framed height
  else
    only1 := false;

  if not (frmInv.qInv.fieldbyname('Framed Height').asstring = '0') then
  begin
    ppDBTextUNFRAMED_HEIGHT := frmInv.qInv.fieldbyname('Framed Height').AsString;
    ppDBTextUNFRAMED_HEIGHT16 := frmInv.qInv.fieldbyname('Framed Height16').AsString;
    ppDBTextUNFRAMED_WIDTH := frmInv.qInv.fieldbyname('Framed Width').AsString;
    ppDBTextUNFRAMED_WIDTH16 := frmInv.qInv.fieldbyname('Framed Width16').AsString;
    ppDBTextUNFRAMED_DEPTH := frmInv.qInv.fieldbyname('Framed Depth').AsString;
    ppDBTextUNFRAMED_DEPTH16 := frmInv.qInv.fieldbyname('Framed Depth16').AsString;
    ConvertDimensions(ppDBTextUNFRAMED_HEIGHT, ppDBTextUNFRAMED_HEIGHT16,
      ppDBTextUNFRAMED_WIDTH, ppDBTextUNFRAMED_WIDTH16,
      ppDBTextUNFRAMED_DEPTH, ppDBTextUNFRAMED_DEPTH16, memo);
    memo2.Text := '<p>SIZE: ' + memo.Text + ' framed </p>';
     size := size + memo2.Text;
     size := StringReplace(size, ' "', '"', [rfReplaceAll, rfIgnoreCase]);

  end;

  if not (frmInv.qInv.fieldbyname('Unframed Height').asstring = '0') then
  begin
    memo.Clear;
    ppDBTextUNFRAMED_HEIGHT := frmInv.qInv.fieldbyname('Unframed Height').AsString;
    ppDBTextUNFRAMED_HEIGHT16 := frmInv.qInv.fieldbyname('Unframed Height16').AsString;
    ppDBTextUNFRAMED_WIDTH := frmInv.qInv.fieldbyname('Unframed Width').AsString;
    ppDBTextUNFRAMED_WIDTH16 := frmInv.qInv.fieldbyname('Unframed Width16').AsString;
    ppDBTextUNFRAMED_DEPTH := frmInv.qInv.fieldbyname('Unframed Depth').AsString;
    ppDBTextUNFRAMED_DEPTH16 := frmInv.qInv.fieldbyname('Unframed Depth16').AsString;
    ConvertDimensions(ppDBTextUNFRAMED_HEIGHT, ppDBTextUNFRAMED_HEIGHT16,
      ppDBTextUNFRAMED_WIDTH, ppDBTextUNFRAMED_WIDTH16,
      ppDBTextUNFRAMED_DEPTH, ppDBTextUNFRAMED_DEPTH16, memo);


    if only1 then
      size := '<p>SIZE: ' + memo.Text + ' unframed'
    else
      size := size + '<p>SIZE: ' + memo.Text + ' unframed </p>';

      size := StringReplace(size, ' "', '"', [rfReplaceAll, rfIgnoreCase]);

   // cm
     memo.Clear;
       ConvertDimensions_cm(ppDBTextUNFRAMED_HEIGHT, ppDBTextUNFRAMED_HEIGHT16,
      ppDBTextUNFRAMED_WIDTH, ppDBTextUNFRAMED_WIDTH16,
      ppDBTextUNFRAMED_DEPTH, ppDBTextUNFRAMED_DEPTH16, memo);


    if only1 then
      size := '<p>SIZE: ' + memo.Text + ' cm unframed'
    else
      size := size + '<p>SIZE: ' + memo.Text + ' cm unframed </p>';
      size := StringReplace(size, ' "', '"', [rfReplaceAll, rfIgnoreCase]);

  
  end;
  if not (frmInv.qInv.fieldbyname('Sight Height').asstring = '0') then
  begin
    memo.Clear;
    ppDBTextUNFRAMED_HEIGHT := frmInv.qInv.fieldbyname('Sight Height').AsString;
    ppDBTextUNFRAMED_HEIGHT16 := frmInv.qInv.fieldbyname('Sight Height16').AsString;
    ppDBTextUNFRAMED_WIDTH := frmInv.qInv.fieldbyname('Sight Width').AsString;
    ppDBTextUNFRAMED_WIDTH16 := frmInv.qInv.fieldbyname('Sight _Width16').AsString; // must fix _W
    ppDBTextUNFRAMED_DEPTH := frmInv.qInv.fieldbyname('Sight Depth').AsString;
    ppDBTextUNFRAMED_DEPTH16 := frmInv.qInv.fieldbyname('Sight Depth16').AsString;
    ConvertDimensions(ppDBTextUNFRAMED_HEIGHT, ppDBTextUNFRAMED_HEIGHT16,
      ppDBTextUNFRAMED_WIDTH, ppDBTextUNFRAMED_WIDTH16,
      ppDBTextUNFRAMED_DEPTH, ppDBTextUNFRAMED_DEPTH16, memo);
    if only1 then
   
      size := '<p>Size: ' + memo.Text + ' sight'
    else
      size := size + '<p>Size: ' + memo.Text + ' sight </p>';
       size := StringReplace(size, ' "', '"', [rfReplaceAll, rfIgnoreCase]);
  end;

  case FormatType of
    gtzFmtLabel:
      begin
        artist_name := artist_name + StringReplace(size, 'Size: ', '', [rfReplaceAll, rfIgnoreCase]); ;
      end;
  else
    artist_name := artist_name + size;
  end;
  details := '';
  if (frmInv.qInv.FieldByName('Signed').asstring = 'Y')
    and (frmInv.qInv.FieldByName('Dated').asstring = 'Y') then
  begin
    details := details + '<p>signed and dated</p>';
    prp.Lines.Strings[6] := artist_name;
  end else
    if (frmInv.qInv.FieldByName('Signed').asstring = 'Y')
      and ((frmInv.qInv.FieldByName('Dated').asstring = 'N') or (frmInv.qInv.FieldByName('Signed').isnull)) then
    begin
      details := details + '<p>signed</p> '; 
      prp.Lines.add(artist_name);
      prp.Lines.Strings[7] := artist_name;

    end else
      if ((frmInv.qInv.FieldByName('Signed').asstring = 'N') or (frmInv.qInv.FieldByName('Signed').isnull))
        and (frmInv.qInv.FieldByName('Dated').asstring = 'Y') then
      begin
        details := details + '<p>dated</p>';
        prp.Lines.Strings[7] := artist_name + '    ';
      end;

  if frmInv.qInv.FieldByName('Inscribed').asstring <> '' then
  begin
    details := details + '<p>' + frmInv.qInv.FieldByName('Inscribed').asstring + '</p>';
    prp.Lines.Strings[8] := artist_name + '    ';
   
  end;

  if FormatType = gtzFmtLabel then
  begin
    artist_name := artist_name + details;
    exit;
  end
  else
    artist_name := artist_name + HDETAILs + details;

  prov := '';
  if frmInv.qProvenance.RecordCount > 0 then

    with frmInv.qProvenance do
    begin
      try
        first;
        while not eof do
        begin
          prov := prov + '<p>' + trim(frmInv.qProvenance.fieldbyname('Prov Owner').asstring);
  
          if frmInv.qProvenance.fieldbyname('Prov Loc').asstring <> '0' then
          begin
            qCodes.Filtered := False;
            qCodes.Filter := '';
            qCodes.OnFilterRecord := nil;
            qCodes.Filter := Format('[%s] = %s', ['Code Type', '14']);
            qCodes.Filtered := True;
            if frmInv.qProvenance.fieldbyname('Prov Loc').asstring <> '' then
            Begin
            qCodes.Locate('ID', frmInv.qProvenance.fieldbyname('Prov Loc').asstring, []);
            prov := prov + ' ' + qCodes.FieldByName('Description').AsString;
            End;
          end;
          if frmInv.qProvenance.fieldbyname('Prov Date').asstring <> '0' then
            prov := prov + ' ' + trim(frmInv.qProvenance.fieldbyname('Prov Date').asstring);

          if frmInv.qProvenance.fieldbyname('Prov Memo').asstring <> '0' then
            prov := prov + ' ' + trim(frmInv.qProvenance.fieldbyname('Prov Memo').asstring);
          prov := trim(prov) + '</p>';
          next;
        end;
      finally;
        if trim(prov) <> '' then
        begin
          if FormatType = gtzFmtFact then

            artist_name := artist_name + HPROV + '</p>' + prov;
        end;
      end;
    end;

    if FormatType = gtzFmtFact then
    begin
      if frmInv.qInv.FieldByName('Purchased From').asstring <> '' then
      begin
        artist_name := artist_name + '<p>Purchased From: ' +
          frmInv.lcbPurchasedFromID.Text;
        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Date').asstring;
        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Notes').asstring;
        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Payment No').asstring + '</p>';
      end;
    end;

    exh := '';

    if frmInv.qExhibition.RecordCount > 0 then begin
      with frmInv.qExhibition do begin
        try
          first;
          if FormatType = gtzFmtFact then
          begin
            // prp.Attr.Style := [afsBold];
            prp.Lines.add('<b>' + HEXHIB + '</b>');
            artist_name := artist_name + HEXHIB;

          end else
          begin
            prp.Lines.Strings[11] := 'EXHIBITION HISTORY';
            artist_name := artist_name + HEXHIB;

          end;

          while not eof do
          begin
            exh := '';
            if frmInv.qExhibition.fieldbyname('Exhibit Title').AsString <> '' then
            
            exh := exh + '<p><i>' + frmInv.qExhibition.fieldbyname('Exhibit Title').AsString + '</i>, '
            else     exh := exh + '<p>';
            exh := exh + frmInv.qExhibition.fieldbyname('Exhibit Sponser').asstring;

            qCodes.Filtered := False;
            qCodes.Filter := '';
            qCodes.OnFilterRecord := nil;
            if frmInv.qExhibition.fieldbyname('Exhibit Location').asstring <> '' then
              Begin
            qCodes.Locate('ID', frmInv.qExhibition.fieldbyname('Exhibit Location').asstring, []);

            exh := exh + ' ' + qCodes.FieldByName('Description').AsString;
              End;
            exh := exh + ', ' + frmInv.qExhibition.fieldbyname('Exhibit Dates').asstring;
            exh := trim(exh);
            if trim(exh) <> '' then
            begin
              artist_name := artist_name + exh + '</p>' + '<p></p>';
            end;
            next;
          end;
        finally;
        end;
      end;
    end;
    repo := ''; repo2 := ''; repo3 := '';

    if frmInv.qReproduction.RecordCount > 0 then begin
      with frmInv.qReproduction do begin
        try
          first;

         
          if FormatType = gtzFmtFact then
            prp.Lines.Strings[12] := ''
          else
            prp.Lines.Strings[12] := 'REPRODUCTION HISTORY';
          artist_name := artist_name + HREPO + '</p>';
          while not eof do
          begin

            repo := ''; repo2 := ''; repo3 := '';
            repo := repo + '<p>' + frmInv.qReproduction.fieldbyname('Reproduction Author').asstring + ','; // NO SPACE BEC NEXT IS <I>
            repo2 := repo2 + '<i>' + frmInv.qReproduction.fieldbyname('Reproduction Title').AsString + '</i>' + ', ';
            if frmInv.qReproduction.fieldbyname('Reproduction Name').asstring <> '' then
              repo3 := repo3 {+ ' (' } + frmInv.qReproduction.fieldbyname('Reproduction Name').asstring + ', ';



           if frmInv.qReproduction.fieldbyname('Reproduction Location').asstring <> '' then
              Begin
            qCodes.Locate('ID', frmInv.qReproduction.fieldbyname('Reproduction Location').asstring, []);

            repo3 := repo3 + ' (' + qCodes.FieldByName('Description').AsString;
              End else
              repo3 := repo3 + ' (';



           if frmInv.qReproduction.fieldbyname('Reproduction Date').asstring<>'' then
           repo3 := repo3   + ', '+ frmInv.qReproduction.fieldbyname('Reproduction Date').asstring + ')'
            else
            repo3 := repo3  + ')';
            if frmInv.qReproduction.fieldbyname('Reproduction Page').asstring <> '0' then
              repo3 := repo3 + ', ' + frmInv.qReproduction.fieldbyname('Reproduction Page').asstring;
            repo3 := trim(repo3) + '</p>';
            if trim(repo) <> '' then
            begin
              artist_name := artist_name + repo + ' ' + repo2 + ' ' + repo3 + '<p></p>';
            end;
            next;
          end;
        finally;
        end;
      end;
    end;
    if FormatType = gtzFmtRegistra then
    begin
      if frmInv.qInv.FieldByName('Purchased From').asstring <> '' then
      begin
        artist_name := artist_name + '<p>Purchased From: ' +
          frmInv.lcbPurchasedFromID.Text;

        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Date').asstring;
        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Notes').asstring;
        artist_name := artist_name + ', ' + frmInv.qInv.FieldByName('Purchased Payment No').asstring;
        artist_name := artist_name + '</p>';
      end;
      if frmInv.qInv.FieldByName('Consigned From ID').asstring <> '' then
      begin
        artist_name := artist_name + '<p>Consigned From: ' + frmInv.lcbConsignedFromID.Text + '</p>';

      end;

      if frmInv.qInv.FieldByName('Sold To ID').asstring <> '' then
      begin
        artist_name := artist_name + ' <p>Sold to:' + frmInv.lcbSoldToID.Text; // frmInv.qInv.FieldByName('Sold To ID').asstring;
        artist_name := artist_name + ' ' + frmInv.qInv.FieldByName('Sold For').asstring;
        artist_name := artist_name + ' ' + frmInv.qInv.FieldByName('Sold Date').asstring + '</p>';
      end;
    end;


    if FormatType = gtzFmtRegistra then
    begin
      if frmInv.qTerms.RecordCount > 0 then begin
        repo := '';
        with frmInv.qTerms do begin
          try
            first;
            while not eof do
            begin
              if frmInv.qTerms.fieldbyname('Terms Type').asstring <> '' then
                repo := repo + ' ' + frmInv.qTerms.fieldbyname('Terms Type').asstring + ' ';
              if frmInv.qTerms.fieldbyname('Terms With').asstring <> '' then
                repo := repo + frmInv.qTerms.fieldbyname('Terms With').asstring;
              if frmInv.qTerms.fieldbyname('Terms Time').asstring <> '' then
                repo := repo + ' for a duaration of  ' + frmInv.qTerms.fieldbyname('Terms Time').asstring;
              if frmInv.qTerms.fieldbyname('Terms Price').asstring <> '' then

                repo := repo + ' amount of ' + frmInv.qTerms.fieldbyname('Terms Price').asstring;
              if frmInv.qTerms.fieldbyname('Received').asstring <> '' then
                repo := repo + 'Received on ' + frmInv.qTerms.fieldbyname('Received').asstring;
              if frmInv.qTerms.fieldbyname('Date Returned').asstring <> '' then
                repo := repo + ' Returned on ' + frmInv.qTerms.fieldbyname('Date Returned').asstring;
              if frmInv.qTerms.fieldbyname('Terms Notes').asstring <> '' then

                repo := repo + ' Notes: ' + frmInv.qTerms.fieldbyname('Terms Notes').asstring;

              repo := '<p>' + trim(repo) + '</p>';
              next;
            end;
          finally;
            if trim(repo) <> '' then
            begin
              artist_name := artist_name + '<p>TERMS HISTORY:</p>' + repo;

            end;
          end;
        end;
      end;
    end;

end;