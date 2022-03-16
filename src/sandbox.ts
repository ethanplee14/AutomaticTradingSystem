import robinhood from "robinhood";
import fetch from 'node-fetch'
import {scrapeSpacUniverse} from "./strategies/spactastic/spac-lookup";
import {Ibkr} from "./brokers/ibkr/ibkr";
import {IbkrMarketData} from "./market/ibkr/ibkr-market-data";
import ibkrConfigs from "../config/ibkr.json";
import {TokenFile} from "./brokers/tda/auth/token-file";
import {tdaClient} from "./brokers/tda";
import {TDAMarketData} from "./market/tda/tda-market-data";

(async () => {
    const tokenFile = new TokenFile("config/tda-tokens.json")
    await tokenFile.load()
    const client = tdaClient(tokenFile)
    const marketData = new TDAMarketData(client)
    const spacs = ["AAC","AAQC","ABGI","ACAB","ACAH","ACAQ","ACAX","ACDI","ACII","ACQR","ACRO","ADAL","ADRA","ADRT",
        "AEAC","AEAE","AEHA","AFAC","AFAQ","AFTR","AGAC","AGCB","AGGR","AHPA","AHRN","AIB","ALCC","ALOR","ALPA","ALSA",
        "ALTU","AMAO","AMPI","ANAC","ANZU","AOGO","APAC","APCA","APGB","APMI","APN","APTM","APXI","ARBG","ARCK","ARGU",
        "ARRW","ARTE","ARYD","ARYE","ASAQ","ASAX","ASCA","ASZ","ATA","ATAK","ATAQ","ATEK","ATVC","AUS","AVAC","AVAN",
        "AVHI","AXAC","AXH","BACA","BCAC","BCSA","BFAC","BGSX","BHAC","BHSE","BIOS","BITE","BLEU","BLNG","BLSA","BLUA",
        "BMAC","BMAQ","BNIX","BNNR","BOAC","BOCN","BPAC","BRAC","BRD","BRIV","BRKH","BSAQ","BSKY","BTWN","BWAC","BWAQ",
        "BWC","BYN","BYNO","BYTS","CAS","CBRG","CCAI","CCTS","CCV","CCVI","CDAQ","CENQ","CFFE","CFFS","CFIV","CHAA",
        "CIIG","CITE","CLAA","CLAS","CLAY","CLBR","CLIM","CLIN","CLOE","CLRM","CMCA","CNDA","CNDB","CNGL","CNTQ","COLI",
        "CONX","COOL","CORS","COVA","CPAA","CPAQ","CPAR","CPUH","CREC","CRU","CRZN","CSLM","CSTA","CTAQ","CVII","CXAC",
        "DALS","DAOO","DCRD","DGNU","DHAC","DHBC","DHCA","DHHC","DILA","DISA","DKDCA","DLCA","DMAQ","DMYS","DNAB","DNAD",
        "DNZ","DPCS","DRAY","DSAQ","DTOC","DTRT","DUET","EAC","EBAC","EDTX","EGGF","EMLD","ENCP","ENER","ENPC","ENTF",
        "EOCW","EPHY","EPWR","EQD","EQHA","ERES","ESAC","ESM","ETAC","EUCR","EVE","EVGR","EVOJ","FACA","FACT","FATP",
        "FCAX","FEXD","FGMC","FHLT","FIAC","FICV","FINM","FLAC","FLAG","FLME","FLYA","FMIV","FNVT","FOXW","FRBN","FRLA",
        "FRON","FRW","FRXB","FSNB","FSRX","FSSI","FST","FTAA","FTEV","FTII","FTPA","FTVI","FVAM","FVIV","FVT","FWAC","FXCO",
        "FZT","GAMC","GAPA","GAQ","GATE","GDNR","GEEX","GENQ","GFGD","GFOR","GFX","GGAA","GGGV","GGMC","GHAC","GHIX","GIA",
        "GIAC","GIW","GLEE","GLHA","GLLI","GLTA","GMFI","GNAC","GOAC","GOBI","GOGN","GPAC","GRCY","GSAQ","GSEV","GSQB",
        "GSRM","GTAC","GTPA","GTPB","GVCI","GWII","GXII","HAAC","HAIA","HCAR","HCIC","HCII","HCMA","HCNE","HCVI","HERA",
        "HHGC","HHLA","HIGA","HIII","HLAH","HMA","HMCO","HNRA","HORI","HPLT","HPX","HSAQ","HTAQ","HWEL","HWKZ","HZON",
        "IACC","IBER","ICNC","IFIN","IGAC","IGNY","IGTA","IIII","IMAQ","INAQ","INKA","INTE","IOAC","IPAX","IPOD","IPOF",
        "IPVA","IPVI","IQMD","IRRX","ISAA","ISLE","ITAQ","ITQ","IVCB","IVCP","IXAQ","JAQC","JATT","JCIC","JGGC","JMAC","JOFF",
        "JUGG","JUN","JWAC","JWSM","JYAC","KACL","KAHC","KAII","KAIR","KCAC","KCGI","KIII","KINZ","KLAQ","KNSW","KRNL","KSI",
        "KVSA","KVSC","KWAC","KYCH","LAAA","LATG","LAX","LBBB","LCA","LCAA","LCW","LDHA","LEAP","LEGA","LFAC","LFTR","LGAC",
        "LGST","LGTO","LGV","LGVC","LHAA","LHC","LIBY","LION","LITT","LIVB","LJAQ","LMACA","LMAO","LOCC","LOKM","LSPR",
        "LUXA","LVAC","LVRA","MAAQ","MACA", "PICC","PIPP","PLAO","PLMI","PMGM","PMVC","PNTM","PONO","PORT","POW","PPHP",
        "PPYA","PRBM","PRLH","PRPC","PRSR","PSAG","PSPC","PSTH","PTIC","PTOC","PUCK","PV","PWUP","RACB","RACY","RCAC","RCFA",
        "RCHG","RCLF","REVE","REVH","RJAC","RKTA","RMGC","RNER","ROC","ROCG","ROCL","RONI","ROSE","ROSS","RRAC","RVAC","RXRA",
        "SAGA","SAMA","SANB","SBII","SCAQ","SCMA","SCOA","SCOB","SCRM","SCUA","SDAC","SEDA","SGHL","SGII","SHAC","SHAP","SHCA",
        "SHQA","SHUA","SIER","SKYA","SLAC","SLAM","SLVR","SMAP","SMIH","SNRH","SPCM","SPGS","SPTK","SRSA","SSAA","STET","STRE",
        "SUAC","SVFA","SVFB","SVNA","SWET","SWSS","SZZL","TACA","TBCP","TBSA","TCOA","TCVA","TEKK","TETC","TETE","TGAA",
        "TGR","TGVC","THAC","THCA","THCP","TINV","TIOA","TLGA","TLGY","TMAC","TMKR","TMPM","TOAC","TPBA","TPGY","TRAQ","TRCA","TRIS","TRON"
        ,"TRTL","TSIB","TSPQ","TWCB","TWLV","TWND","TWNI","TWOA","TZPS","UPTD","USCT","UTAA","VAQC","VBOC","VCXA","VCXB","VELO","VHNA","VII"
        ,"VLAT","VMCA","VMGA","VPCB","VSAC","VTIQ","VYGG","WARR","WAVC","WAVS","WEL","WINV","WNNR","WPCA","WPCB","WQGA","WRAC","WTMA","WWAC"
        ,"XFIN","XPAX","XPDB","YTPG","ZING","ZT","ZWRK"]
    console.log(spacs.length)
    console.log(await marketData.stockQuote(...spacs.slice(0, 500)))
    // console.log(quotes)
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    // const accountId = ibkrConfigs.paperTradingId
    // const ibkr = new Ibkr(accountId)
    // const ibkrData = new IbkrMarketData(ibkr)
    //
    // console.log(await ibkrData.stockQuote("MARA", "RIOT", "BYN", "RKT"))
    // spacData.forEach((spac: any) => {
    //     if (spac.commonSymbol != spac.initialCommonSymbol)
    //         console.log(`${spac.commonSymbol} differs from ${spac.initialCommonSymbol}`)
    // })
})()

