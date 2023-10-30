import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import Badge from "components/Badge/Badge";
import useArtists from "hooks/useArtists";
import { useEffect, useState } from "react";

interface AutoCompleteOption {
  label: string;
  id: string;
  image: string;
}

const Step2 = () => {

  const { artistsData, setQuery } = useArtists.Search();
  const [artists, setArtists] = useState<any>([]);
  const [selectedArtists, setSelectedArtists] = useState<AutoCompleteOption[]>([]);
  const [value, setValue] = useState<string | null>(artists[0]);

  useEffect(() => {
    var data = artistsData as [];

    if (artistsData) {
      var tmp: AutoCompleteOption[] = [];

      data.forEach((artist: any) => {
        tmp.push({
          label: artist.name,
          id: artist.id,
          image: artist?.images[2]?.url ?? null,
        });
      });

      setArtists(tmp);
    }
  }, [artistsData]);

  useEffect(() => {
    if (selectedArtists) {
      console.log(selectedArtists);
    }
  }, [selectedArtists]);

  function selectArtist(input: string) {
    var tmp: AutoCompleteOption[] = [];
    tmp.push(...selectedArtists);
    var match = artists.find((artist: AutoCompleteOption) => artist.label === input);
    if (match) {
      if (selectedArtists.includes(match)) {
        return ;
      }
      tmp.push(match);
    }
    setSelectedArtists(tmp);
  }

  function deleteArtist(artist: any) {
    var tmp: AutoCompleteOption[] = [];
    tmp.push(...selectedArtists);

    tmp.splice(tmp.indexOf(artist), 1);

    setSelectedArtists(tmp);
  }

  return (
    <>
      <Typography component="h5" variant="h5" marginBottom={2}>
        Tell us a little bit about yourself!
      </Typography>
      <Typography component="p" variant="caption" marginBottom={2}>
        This part will let us know a little bit more about you, in order to taylor our content to fit your taste!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="description"
            fullWidth
            multiline
            rows={6}
            id="description"
            label="Describe yourself"
            autoFocus />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3" variant="body1">
            Who are your favorite artists?
          </Typography>
          <Typography component="p" variant="caption" marginBottom={2}>
            (Select up to five)
          </Typography>
          <Autocomplete
            fullWidth
            clearOnBlur
            id="artist-combobox"
            options={artists}
            disabled={selectedArtists.length === 5}
            isOptionEqualToValue={(option: any, value: any) =>
              option.iso === value.iso
            }
            onSelectCapture={(event) => {
              var val = (event.target as HTMLSelectElement).value;
              if (val) {
                selectArtist(val);
              }
            }}
            onChangeCapture={(event) => {
              var val = (event.target as HTMLTextAreaElement).value;
              
              if (val.length > 2) {
                setQuery(val);
              } 
            }}
            clearOnEscape
            renderInput={(params) => <TextField {...params} label="Artist" />}
          />
        </Grid>

        <Grid item xs={12}>
          {
            selectedArtists.map((artist) => {
              return (
                <Badge key={artist.id}
                  alt={artist.label} 
                  label={artist.label}
                  image={artist.image}
                  handleDelete={() => {
                    console.log("Delete");
                    deleteArtist(artist);
                  }} 
                />
              );
            })
          }
        </Grid>
      </Grid>
    </>
  );
};

export default Step2;